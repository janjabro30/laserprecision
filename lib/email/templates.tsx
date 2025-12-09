// Email Templates for Notifications (Norwegian)

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  variant?: string;
}

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: string;
  estimatedDelivery?: string;
}

/**
 * Base email template wrapper
 */
function EmailWrapper(children: string): string {
  return `
<!DOCTYPE html>
<html lang="nb">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #FAF8F5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 32px;
    }
    .header .gold {
      color: #CCAE6B;
    }
    .divider {
      height: 3px;
      width: 80px;
      background: linear-gradient(90deg, transparent, #CCAE6B, transparent);
      margin: 20px auto;
    }
    .content {
      padding: 40px 20px;
    }
    .footer {
      background-color: #2D2D2D;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #CCAE6B;
      text-decoration: none;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #CCAE6B 0%, #B8994F 100%);
      color: #ffffff;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .order-details {
      background-color: #FAF8F5;
      border: 2px solid #E8D9B8;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #E8D9B8;
    }
    .item:last-child {
      border-bottom: none;
    }
    .total {
      font-size: 20px;
      font-weight: bold;
      color: #CCAE6B;
      padding-top: 15px;
      border-top: 2px solid #CCAE6B;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Laser <span class="gold">Presisjon</span></h1>
      <div class="divider"></div>
    </div>
    ${children}
    <div class="footer">
      <p>Laser Presisjon AS</p>
      <p>Kontakt oss: <a href="mailto:post@laserpresisjon.no">post@laserpresisjon.no</a></p>
      <p>
        <a href="https://laserpresisjon.no/vilkar">Vilkår</a> | 
        <a href="https://laserpresisjon.no/personvernerklaering">Personvern</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Order Confirmation Email (Ordrebekreftelse)
 */
export function generateOrderConfirmationEmail(order: OrderDetails): string {
  const formatPrice = (price: number) => `${price.toFixed(2)} kr`;
  
  const content = `
    <div class="content">
      <h2 style="color: #2D2D2D; margin-bottom: 10px;">Takk for din bestilling!</h2>
      <p style="color: #666;">Hei ${order.customerName},</p>
      <p style="color: #666;">
        Vi har mottatt din bestilling og vil begynne å behandle den snart. 
        Du vil motta en bekreftelse når ordren din er sendt.
      </p>
      
      <div class="order-details">
        <h3 style="color: #2D2D2D; margin-top: 0;">Ordredetaljer</h3>
        <p><strong>Ordrenummer:</strong> ${order.orderNumber}</p>
        <p><strong>E-post:</strong> ${order.email}</p>
        ${order.estimatedDelivery ? `<p><strong>Estimert levering:</strong> ${order.estimatedDelivery}</p>` : ''}
        
        <h4 style="color: #2D2D2D; margin-bottom: 10px;">Produkter:</h4>
        ${order.items.map(item => `
          <div class="item">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <strong>${item.name}</strong>
                ${item.variant ? `<br><span style="color: #666; font-size: 14px;">${item.variant}</span>` : ''}
                <br><span style="color: #666;">Antall: ${item.quantity}</span>
              </div>
              <div style="text-align: right;">
                <strong style="color: #CCAE6B;">${formatPrice(item.price * item.quantity)}</strong>
              </div>
            </div>
          </div>
        `).join('')}
        
        <div style="margin-top: 20px;">
          <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Subtotal:</span>
            <span>${formatPrice(order.subtotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 5px 0;">
            <span>Frakt:</span>
            <span>${formatPrice(order.shipping)}</span>
          </div>
          <div class="total" style="display: flex; justify-content: space-between;">
            <span>Total:</span>
            <span>${formatPrice(order.total)}</span>
          </div>
        </div>
        
        <h4 style="color: #2D2D2D; margin-top: 20px;">Leveringsadresse:</h4>
        <p style="color: #666; white-space: pre-line;">${order.shippingAddress}</p>
      </div>
      
      <div style="text-align: center;">
        <a href="https://laserpresisjon.no/spor-ordre?order=${order.orderNumber}" class="button">
          Spor Min Ordre
        </a>
      </div>
      
      <p style="color: #666; margin-top: 30px;">
        Har du spørsmål? Ikke nøl med å kontakte oss på 
        <a href="mailto:post@laserpresisjon.no" style="color: #CCAE6B;">post@laserpresisjon.no</a>
      </p>
    </div>
  `;
  
  return EmailWrapper(content);
}

/**
 * Order Shipped Email (Ordre sendt)
 */
export function generateOrderShippedEmail(
  order: OrderDetails,
  trackingNumber: string,
  carrier: string
): string {
  const content = `
    <div class="content">
      <h2 style="color: #2D2D2D; margin-bottom: 10px;">Ordren din er sendt! 📦</h2>
      <p style="color: #666;">Hei ${order.customerName},</p>
      <p style="color: #666;">
        Gode nyheter! Ordren din er nå sendt og på vei til deg.
      </p>
      
      <div class="order-details">
        <h3 style="color: #2D2D2D; margin-top: 0;">Sporingsdetaljer</h3>
        <p><strong>Ordrenummer:</strong> ${order.orderNumber}</p>
        <p><strong>Transportør:</strong> ${carrier}</p>
        <p><strong>Sporingsnummer:</strong> ${trackingNumber}</p>
        ${order.estimatedDelivery ? `<p><strong>Estimert levering:</strong> ${order.estimatedDelivery}</p>` : ''}
        
        <h4 style="color: #2D2D2D; margin-top: 20px;">Leveringsadresse:</h4>
        <p style="color: #666; white-space: pre-line;">${order.shippingAddress}</p>
      </div>
      
      <div style="text-align: center;">
        <a href="https://laserpresisjon.no/spor-ordre?order=${order.orderNumber}" class="button">
          Spor Pakken
        </a>
      </div>
      
      <p style="color: #666; margin-top: 30px;">
        Vi håper du blir fornøyd med produktene dine!
      </p>
    </div>
  `;
  
  return EmailWrapper(content);
}

/**
 * Store Pickup Ready Email (Hent i butikk påminnelse)
 */
export function generateStorePickupEmail(order: OrderDetails, storeAddress: string): string {
  const content = `
    <div class="content">
      <h2 style="color: #2D2D2D; margin-bottom: 10px;">Ordren din er klar for henting! 🎉</h2>
      <p style="color: #666;">Hei ${order.customerName},</p>
      <p style="color: #666;">
        Din bestilling er nå klar til å hentes i vår butikk.
      </p>
      
      <div class="order-details">
        <h3 style="color: #2D2D2D; margin-top: 0;">Hentingsinformasjon</h3>
        <p><strong>Ordrenummer:</strong> ${order.orderNumber}</p>
        
        <h4 style="color: #2D2D2D; margin-top: 20px;">Hent på:</h4>
        <p style="color: #666; white-space: pre-line;">${storeAddress}</p>
        
        <h4 style="color: #2D2D2D; margin-top: 20px;">Åpningstider:</h4>
        <p style="color: #666;">
          Mandag - Fredag: 10:00 - 18:00<br>
          Lørdag: 11:00 - 16:00<br>
          Søndag: Stengt
        </p>
      </div>
      
      <p style="color: #666; margin-top: 20px;">
        <strong>Viktig:</strong> Husk å ta med gyldig legitimasjon og ordrenummer når du henter.
      </p>
      
      <p style="color: #666;">
        Ordren oppbevares i 14 dager. Hvis den ikke er hentet innen den tid, 
        vil den bli returnert.
      </p>
    </div>
  `;
  
  return EmailWrapper(content);
}

/**
 * Custom Order Status Update Email (Spesialbestilling statusoppdatering)
 */
export function generateCustomOrderStatusEmail(
  customerName: string,
  orderNumber: string,
  status: string,
  message: string,
  estimatedCompletion?: string
): string {
  const content = `
    <div class="content">
      <h2 style="color: #2D2D2D; margin-bottom: 10px;">Oppdatering på din spesialbestilling</h2>
      <p style="color: #666;">Hei ${customerName},</p>
      <p style="color: #666;">
        Vi har en oppdatering på din spesialbestilling.
      </p>
      
      <div class="order-details">
        <h3 style="color: #2D2D2D; margin-top: 0;">Statusoppdatering</h3>
        <p><strong>Ordrenummer:</strong> ${orderNumber}</p>
        <p><strong>Status:</strong> <span style="color: #CCAE6B;">${status}</span></p>
        ${estimatedCompletion ? `<p><strong>Estimert ferdigstillelse:</strong> ${estimatedCompletion}</p>` : ''}
        
        <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-left: 3px solid #CCAE6B;">
          <p style="color: #2D2D2D; margin: 0;">${message}</p>
        </div>
      </div>
      
      <p style="color: #666; margin-top: 30px;">
        Har du spørsmål om din bestilling? Kontakt oss på 
        <a href="mailto:post@laserpresisjon.no" style="color: #CCAE6B;">post@laserpresisjon.no</a>
      </p>
    </div>
  `;
  
  return EmailWrapper(content);
}

/**
 * Utility to send email (mock implementation)
 */
export async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  try {
    // In production, this would integrate with an email service like SendGrid, AWS SES, or similar
    console.log('Sending email to:', to);
    console.log('Subject:', subject);
    console.log('Content length:', htmlContent.length);
    
    // Mock successful send
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}
