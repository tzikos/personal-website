// Client-side rate limiting service for chatbot
export interface RateLimitConfig {
  maxMessagesPerMinute: number;
  cooldownBetweenMessages: number; // milliseconds
  maxCharactersPerMessage: number;
}

export interface RateLimitState {
  canSendMessage: boolean;
  remainingCooldown: number;
  messagesInLastMinute: number;
  reason?: string;
}

export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  maxMessagesPerMinute: 10,
  cooldownBetweenMessages: 3000, // 3 seconds
  maxCharactersPerMessage: 200
};

/**
 * Client-side rate limiting service to prevent spam and manage API usage
 */
export class RateLimitService {
  private static instance: RateLimitService;
  private config: RateLimitConfig;
  private messageTimestamps: number[] = [];
  private lastMessageTime: number = 0;
  private cooldownTimer: NodeJS.Timeout | null = null;
  private listeners: ((state: RateLimitState) => void)[] = [];

  private constructor(config: RateLimitConfig = DEFAULT_RATE_LIMIT_CONFIG) {
    this.config = config;
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): RateLimitService {
    if (!RateLimitService.instance) {
      RateLimitService.instance = new RateLimitService();
    }
    return RateLimitService.instance;
  }

  /**
   * Check if user can send a message
   * @param messageContent - Content of the message to validate
   * @returns Rate limit state
   */
  public canSendMessage(messageContent: string): RateLimitState {
    const now = Date.now();
    
    // Check character limit
    if (messageContent.length > this.config.maxCharactersPerMessage) {
      return {
        canSendMessage: false,
        remainingCooldown: 0,
        messagesInLastMinute: this.getMessagesInLastMinute(),
        reason: `Message too long (${messageContent.length}/${this.config.maxCharactersPerMessage} characters)`
      };
    }

    // Check cooldown between messages
    const timeSinceLastMessage = now - this.lastMessageTime;
    if (timeSinceLastMessage < this.config.cooldownBetweenMessages) {
      const remainingCooldown = this.config.cooldownBetweenMessages - timeSinceLastMessage;
      return {
        canSendMessage: false,
        remainingCooldown,
        messagesInLastMinute: this.getMessagesInLastMinute(),
        reason: `Please wait ${Math.ceil(remainingCooldown / 1000)} seconds before sending another message`
      };
    }

    // Check messages per minute limit
    const messagesInLastMinute = this.getMessagesInLastMinute();
    if (messagesInLastMinute >= this.config.maxMessagesPerMinute) {
      return {
        canSendMessage: false,
        remainingCooldown: 0,
        messagesInLastMinute,
        reason: `Rate limit exceeded. Maximum ${this.config.maxMessagesPerMinute} messages per minute.`
      };
    }

    return {
      canSendMessage: true,
      remainingCooldown: 0,
      messagesInLastMinute
    };
  }

  /**
   * Record a message being sent
   */
  public recordMessage(): void {
    const now = Date.now();
    this.lastMessageTime = now;
    this.messageTimestamps.push(now);
    
    // Clean up old timestamps
    this.cleanupOldTimestamps();
    
    // Notify listeners
    this.notifyListeners();
    
    // Start cooldown timer
    this.startCooldownTimer();
  }

  /**
   * Get number of messages sent in the last minute
   */
  private getMessagesInLastMinute(): number {
    this.cleanupOldTimestamps();
    return this.messageTimestamps.length;
  }

  /**
   * Remove timestamps older than 1 minute
   */
  private cleanupOldTimestamps(): void {
    const oneMinuteAgo = Date.now() - 60000;
    this.messageTimestamps = this.messageTimestamps.filter(timestamp => timestamp > oneMinuteAgo);
  }

  /**
   * Start cooldown timer to notify listeners when cooldown expires
   */
  private startCooldownTimer(): void {
    if (this.cooldownTimer) {
      clearTimeout(this.cooldownTimer);
    }

    this.cooldownTimer = setTimeout(() => {
      this.notifyListeners();
    }, this.config.cooldownBetweenMessages);
  }

  /**
   * Get current rate limit state
   */
  public getCurrentState(): RateLimitState {
    const now = Date.now();
    const timeSinceLastMessage = now - this.lastMessageTime;
    const remainingCooldown = Math.max(0, this.config.cooldownBetweenMessages - timeSinceLastMessage);
    const messagesInLastMinute = this.getMessagesInLastMinute();

    let canSendMessage = true;
    let reason: string | undefined;

    if (remainingCooldown > 0) {
      canSendMessage = false;
      reason = `Please wait ${Math.ceil(remainingCooldown / 1000)} seconds`;
    } else if (messagesInLastMinute >= this.config.maxMessagesPerMinute) {
      canSendMessage = false;
      reason = `Rate limit exceeded (${messagesInLastMinute}/${this.config.maxMessagesPerMinute} messages/min)`;
    }

    return {
      canSendMessage,
      remainingCooldown,
      messagesInLastMinute,
      reason
    };
  }

  /**
   * Subscribe to rate limit state changes
   */
  public subscribe(listener: (state: RateLimitState) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners(): void {
    const state = this.getCurrentState();
    this.listeners.forEach(listener => listener(state));
  }

  /**
   * Update rate limit configuration
   */
  public updateConfig(config: Partial<RateLimitConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  public getConfig(): RateLimitConfig {
    return { ...this.config };
  }

  /**
   * Reset rate limiting state (useful for testing or admin override)
   */
  public reset(): void {
    this.messageTimestamps = [];
    this.lastMessageTime = 0;
    if (this.cooldownTimer) {
      clearTimeout(this.cooldownTimer);
      this.cooldownTimer = null;
    }
    this.notifyListeners();
  }

  /**
   * Get time until next message can be sent
   */
  public getTimeUntilNextMessage(): number {
    const now = Date.now();
    const timeSinceLastMessage = now - this.lastMessageTime;
    return Math.max(0, this.config.cooldownBetweenMessages - timeSinceLastMessage);
  }

  /**
   * Check if message content is valid
   */
  public validateMessageContent(content: string): { valid: boolean; error?: string } {
    if (!content || content.trim().length === 0) {
      return { valid: false, error: 'Message cannot be empty' };
    }

    if (content.length > this.config.maxCharactersPerMessage) {
      return { 
        valid: false, 
        error: `Message too long (${content.length}/${this.config.maxCharactersPerMessage} characters)` 
      };
    }

    return { valid: true };
  }
}

// Export singleton instance
export const rateLimitService = RateLimitService.getInstance();
export default RateLimitService;