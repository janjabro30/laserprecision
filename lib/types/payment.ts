// Payment Types and Interfaces

export type PaymentProvider = 'stripe' | 'vipps' | 'klarna';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface PaymentMethod {
  id: string;
  provider: PaymentProvider;
  name: string;
  description: string;
  enabled: boolean;
  logo?: string;
  testMode: boolean;
}

export interface StripeConfig {
  publicKey: string;
  secretKey: string;
  webhookSecret: string;
  testMode: boolean;
}

export interface VippsConfig {
  clientId: string;
  clientSecret: string;
  subscriptionKey: string;
  merchantSerialNumber: string;
  testMode: boolean;
}

export interface KlarnaConfig {
  username: string;
  password: string;
  region: 'eu' | 'na' | 'oc';
  testMode: boolean;
}

export interface PaymentConfig {
  stripe?: StripeConfig;
  vipps?: VippsConfig;
  klarna?: KlarnaConfig;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  redirectUrl?: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface Transaction {
  id: string;
  orderId: string;
  paymentProvider: PaymentProvider;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentIntentId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
