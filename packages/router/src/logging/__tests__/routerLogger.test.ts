/**
 * Tests for the RouterLoggerService
 */
import {
  RouterLoggerService,
  getRouterLogger,
  initRouterLogger,
  LogLevel,
  RouterEventType,
  type RouterLogger
} from '../routerLogger';

describe('RouterLoggerService', () => {
  // Mock console methods
  const originalConsole = { ...console };
  let mockConsole: jest.SpyInstance[] = [];
  
  // Create mock logger for testing
  const createMockLogger = (): RouterLogger & { mock: jest.Mock[] } => {
    const debug = jest.fn();
    const info = jest.fn();
    const warn = jest.fn();
    const error = jest.fn();
    
    return {
      debug,
      info,
      warn,
      error,
      mock: [debug, info, warn, error]
    };
  };
  
  beforeEach(() => {
    // Reset console mocks
    mockConsole = [
      jest.spyOn(console, 'debug').mockImplementation(),
      jest.spyOn(console, 'info').mockImplementation(),
      jest.spyOn(console, 'warn').mockImplementation(),
      jest.spyOn(console, 'error').mockImplementation()
    ];
    
    // Reset the singleton instance
    jest.resetModules();
  });
  
  afterEach(() => {
    // Restore console
    mockConsole.forEach(mock => mock.mockRestore());
  });
  
  describe('constructor', () => {
    it('should create an instance with default options', () => {
      const logger = new RouterLoggerService();
      expect(logger).toBeInstanceOf(RouterLoggerService);
    });
    
    it('should create an instance with custom options', () => {
      const mockLogger = createMockLogger();
      const logger = new RouterLoggerService({ 
        logger: mockLogger,
        minLevel: LogLevel.WARN,
        logPerformance: false 
      });
      
      expect(logger).toBeInstanceOf(RouterLoggerService);
    });
  });
  
  describe('logEvent', () => {
    it('should log an event at the specified level', () => {
      const mockLogger = createMockLogger();
      const logger = new RouterLoggerService({ logger: mockLogger });
      
      const event = {
        type: RouterEventType.NAVIGATION,
        action: 'start',
        data: { from: '/home', to: '/dashboard' },
        timestamp: Date.now()
      };
      
      logger.logEvent(event, LogLevel.INFO);
      
      expect(mockLogger.info).toHaveBeenCalled();
      expect(mockLogger.debug).not.toHaveBeenCalled();
      expect(mockLogger.warn).not.toHaveBeenCalled();
      expect(mockLogger.error).not.toHaveBeenCalled();
    });
    
    it('should not log events below minimum level', () => {
      const mockLogger = createMockLogger();
      const logger = new RouterLoggerService({ 
        logger: mockLogger,
        minLevel: LogLevel.WARN
      });
      
      const event = {
        type: RouterEventType.NAVIGATION,
        action: 'start',
        data: { from: '/home', to: '/dashboard' },
        timestamp: Date.now()
      };
      
      logger.logEvent(event, LogLevel.INFO);
      
      mockLogger.mock.forEach(mock => {
        expect(mock).not.toHaveBeenCalled();
      });
    });
    
    it('should redact sensitive information in event data', () => {
      const mockLogger = createMockLogger();
      const logger = new RouterLoggerService({ 
        logger: mockLogger,
        redactSensitiveInfo: true
      });
      
      const event = {
        type: RouterEventType.AUTH,
        action: 'login',
        data: { 
          username: 'testuser',
          password: 'secret123',
          token: 'abc123xyz',
          nested: { secret: 'hidden', normal: 'visible' }
        },
        timestamp: Date.now()
      };
      
      logger.logEvent(event);
      
      expect(mockLogger.info).toHaveBeenCalled();
      
      // Get the second argument (data) from the mock call
      const loggedData = mockLogger.info.mock.calls[0][1];
      
      // Check that sensitive fields are redacted
      expect(loggedData.password).toBe('[REDACTED]');
      expect(loggedData.token).toBe('[REDACTED]');
      expect(loggedData.nested.secret).toBe('[REDACTED]');
      
      // Check that non-sensitive fields are not redacted
      expect(loggedData.username).toBe('testuser');
      expect(loggedData.nested.normal).toBe('visible');
    });
  });
  
  describe('logNavigation', () => {
    it('should log navigation start and complete events', () => {
      jest.useFakeTimers();
      
      const mockLogger = createMockLogger();
      const logger = new RouterLoggerService({ logger: mockLogger });
      
      logger.logNavigation('/home', '/dashboard', { id: '123' });
      
      // Initial event logged immediately
      expect(mockLogger.debug).toHaveBeenCalledTimes(1);
      
      // Complete event logged after timeout
      jest.runAllTimers();
      
      // Depends on whether the implementation uses setTimeout internally
      // If it does, debug would be called again for the completion
      expect(mockLogger.debug).toHaveBeenCalledTimes(1);
      expect(mockLogger.info).toHaveBeenCalledTimes(1);
      
      jest.useRealTimers();
    });
  });
  
  describe('logDataFetch', () => {
    it('should return a completion logger', () => {
      const mockLogger = createMockLogger();
      const logger = new RouterLoggerService({ logger: mockLogger });
      
      const fetchLogger = logger.logDataFetch('/api/data', { cacheTtl: 60 });
      
      expect(fetchLogger).toBeDefined();
      expect(typeof fetchLogger.complete).toBe('function');
      
      // Logs start event
      expect(mockLogger.debug).toHaveBeenCalledTimes(1);
      
      // Call complete
      fetchLogger.complete(true, { result: 'success' });
      
      // Logs completion event
      expect(mockLogger.debug).toHaveBeenCalledTimes(2);
    });
    
    it('should log failed fetch as warning', () => {
      const mockLogger = createMockLogger();
      const logger = new RouterLoggerService({ logger: mockLogger });
      
      const fetchLogger = logger.logDataFetch('/api/data');
      fetchLogger.complete(false);
      
      expect(mockLogger.warn).toHaveBeenCalled();
    });
  });
  
  describe('getRouterLogger and initRouterLogger', () => {
    it('should create a singleton logger instance', () => {
      const logger1 = getRouterLogger();
      const logger2 = getRouterLogger();
      
      expect(logger1).toBe(logger2);
    });
    
    it('should initialize a new logger with custom config', () => {
      const mockLogger = createMockLogger();
      const logger1 = getRouterLogger();
      
      const logger2 = initRouterLogger({ logger: mockLogger });
      
      expect(logger2).not.toBe(logger1);
      
      // The next call should return the newly initialized instance
      const logger3 = getRouterLogger();
      expect(logger3).toBe(logger2);
    });
  });
}); 