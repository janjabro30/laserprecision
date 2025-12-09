// Klarna Payment Integration ("Betal senere" - Pay later)
import { PaymentResult, KlarnaConfig } from '@/lib/types/payment';

export class KlarnaIntegration {
  private config: KlarnaConfig;

  constructor(config: KlarnaConfig) {
    this.config = config;
  }

  /**
   * Create Klarna order session
   */
  async createSession(amount: number, orderId: string, _locale: string = 'nb-NO'): Promise<PaymentResult> {
    try {
      if (!this.config.username || !this.config.password) {
        return {
          success: false,
          error: 'Klarna configuration incomplete',
        };
      }

      // Mock Klarna session creation
      const sessionId = `klarna_${orderId}_${Date.now()}`;
      const clientToken = `${sessionId}_token_${Math.random().toString(36).substr(2, 9)}`;

      return {
        success: true,
        paymentId: sessionId,
        metadata: {
          clientToken,
          sessionId,
          paymentMethodCategories: [
            'pay_later',
            'pay_over_time',
            'pay_now',
          ],
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Create Klarna order
   */
  async createOrder(_sessionId: string, _authorizationToken: string): Promise<PaymentResult> {
    try {
      // Mock order creation
      const orderId = `klarna_order_${Date.now()}`;

      return {
        success: true,
        paymentId: orderId,
        redirectUrl: `/checkout/confirmation?klarna_order_id=${orderId}`,
        metadata: {
          orderId,
          fraudStatus: 'ACCEPTED',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Capture Klarna order
   */
  async captureOrder(orderId: string, amount: number): Promise<PaymentResult> {
    try {
      // Mock capture
      return {
        success: true,
        paymentId: orderId,
        metadata: {
          captureId: `capture_${Date.now()}`,
          capturedAmount: amount,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Cancel Klarna order
   */
  async cancelOrder(orderId: string): Promise<PaymentResult> {
    try {
      // Mock cancellation
      return {
        success: true,
        paymentId: orderId,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get order details
   */
  async getOrderDetails(orderId: string): Promise<PaymentResult> {
    try {
      // Mock order details retrieval
      return {
        success: true,
        paymentId: orderId,
        metadata: {
          status: 'CAPTURED',
          purchaseCountry: 'NO',
          purchaseCurrency: 'NOK',
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Factory function to create Klarna integration
export function createKlarnaIntegration(config: KlarnaConfig): KlarnaIntegration {
  return new KlarnaIntegration(config);
}
