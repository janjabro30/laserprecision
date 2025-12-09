import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get this month's date range
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Fetch stats in parallel
    const [
      ordersToday,
      pendingOrders,
      totalCustomers,
      specialOrders,
      monthlyOrders,
      allInventory,
    ] = await Promise.all([
      // Orders today
      prisma.order.count({
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
      // Pending orders
      prisma.order.count({
        where: {
          status: {
            in: ['Mottatt', 'Under behandling', 'Pakket'],
          },
        },
      }),
      // Total customers
      prisma.customer.count(),
      // Special orders (pending/in progress)
      prisma.specialOrder.count({
        where: {
          status: {
            not: 'Levert',
          },
        },
      }),
      // Monthly orders for revenue calculation
      prisma.order.findMany({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
          status: {
            not: 'Kansellert',
          },
        },
        select: {
          total: true,
        },
      }),
      // Get all inventory to check low stock
      prisma.inventory.findMany({
        select: {
          quantity: true,
          lowStockThreshold: true,
        },
      }),
    ]);

    // Calculate monthly revenue
    const revenue = monthlyOrders.reduce((sum, order) => sum + order.total, 0);

    // Count low stock items
    const lowStockItems = allInventory.filter(
      (item) => item.quantity <= item.lowStockThreshold
    ).length;

    return NextResponse.json({
      ordersToday,
      revenue,
      pendingOrders,
      lowStockItems,
      totalCustomers,
      specialOrders,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
