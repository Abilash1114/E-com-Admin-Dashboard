import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

declare var $: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('salesChart') salesChartRef!: ElementRef;
  @ViewChild('orderChart') orderChartRef!: ElementRef;

  private salesChartInst: Chart | null = null;
  private orderChartInst: Chart | null = null;

  statCards = [
    { label: 'Total Sales', value: '$56,890.45', rawValue: 56890, change: '+18.6%', icon: 'ri-money-dollar-circle-line', bg: '#ede9fe', color: '#6c3ce1', accent: '#6c3ce1' },
    { label: 'Orders', value: '1,248', rawValue: 1248, change: '+12.4%', icon: 'ri-shopping-bag-3-line', bg: '#dbeafe', color: '#3b82f6', accent: '#3b82f6' },
    { label: 'Customers', value: '836', rawValue: 836, change: '+15.2%', icon: 'ri-group-2-line', bg: '#d1fae5', color: '#10b981', accent: '#10b981' },
    { label: 'Products Sold', value: '2,450', rawValue: 2450, change: '+20.8%', icon: 'ri-gift-line', bg: '#ffedd5', color: '#f97316', accent: '#f97316' },
    { label: 'Avg. Order Value', value: '$45.62', rawValue: 45, change: '+8.7%', icon: 'ri-pie-chart-2-line', bg: '#fdf4ff', color: '#a855f7', accent: '#a855f7' },
  ];

  topProducts = [
    { name: 'Diamond Necklace', sold: 520, revenue: '$18,450.00', icon: '💎' },
    { name: 'Gold Earrings', sold: 410, revenue: '$12,350.00', icon: '📿' },
    { name: 'Silver Bracelet', sold: 380, revenue: '$8,750.00', icon: '⌚' },
    { name: 'Pearl Ring', sold: 310, revenue: '$6,850.00', icon: '💍' },
    { name: 'Gold Chain', sold: 240, revenue: '$5,250.00', icon: '🔗' },
  ];

  salesChannels = [
    { name: 'Online Store', icon: 'ri-global-line', iconColor: '#6c3ce1', amount: '$28,450', pct: 50.0, barW: 100, color: '#6c3ce1' },
    { name: 'Amazon', icon: 'ri-amazon-line', iconColor: '#f97316', amount: '$12,650', pct: 22.2, barW: 44, color: '#f97316' },
    { name: 'Flipkart', icon: 'ri-store-line', iconColor: '#3b82f6', amount: '$8,650', pct: 15.2, barW: 30, color: '#3b82f6' },
    { name: 'Instagram', icon: 'ri-instagram-line', iconColor: '#ec4899', amount: '$4,850', pct: 8.6, barW: 17, color: '#ec4899' },
    { name: 'Others', icon: 'ri-more-2-line', iconColor: '#6b7280', amount: '$2,290', pct: 4.0, barW: 8, color: '#9ca3af' },
  ];

  customerInsights = [
    { label: 'New Customers', value: '210', change: '↑ 16.8%', icon: 'ri-user-add-line', bg: '#ede9fe', color: '#6c3ce1' },
    { label: 'Returning Customers', value: '626', change: '↑ 11.2%', icon: 'ri-user-follow-line', bg: '#dbeafe', color: '#3b82f6' },
    { label: 'Customer Satisfaction', value: '4.8 / 5', change: '↑ 0.6', icon: 'ri-star-line', bg: '#fef9c3', color: '#ca8a04' },
    { label: 'Repeat Purchase Rate', value: '32.6%', change: '↑ 5.4%', icon: 'ri-refresh-line', bg: '#d1fae5', color: '#10b981' },
  ];

  recentOrders = [
    { id: '#ORD-1256', customer: 'John Doe', date: 'May 22, 2026', amount: '$1,250.00', status: 'Delivered', payment: 'Paid' },
    { id: '#ORD-1255', customer: 'Jane Smith', date: 'May 22, 2026', amount: '$890.00', status: 'Processing', payment: 'Paid' },
    { id: '#ORD-1254', customer: 'Robert Brown', date: 'May 21, 2026', amount: '$1,560.00', status: 'Shipped', payment: 'COD' },
    { id: '#ORD-1253', customer: 'Emily Davis', date: 'May 21, 2026', amount: '$650.00', status: 'Cancelled', payment: 'Refunded' },
    { id: '#ORD-1252', customer: 'Michael Wilson', date: 'May 20, 2026', amount: '$2,350.00', status: 'Delivered', payment: 'Paid' },
  ];

  salesByLocation = [
    { country: 'India', flag: '🇮🇳', amount: '$28,450', pct: 50, color: '#6c3ce1' },
    { country: 'USA', flag: '🇺🇸', amount: '$12,650', pct: 22, color: '#3b82f6' },
    { country: 'UK', flag: '🇬🇧', amount: '$8,650', pct: 15, color: '#10b981' },
    { country: 'Australia', flag: '🇦🇺', amount: '$4,850', pct: 9, color: '#f59e0b' },
    { country: 'Others', flag: '🌍', amount: '$2,290', pct: 4, color: '#9ca3af' },
  ];

  orderStatusData = [
    { label: 'Delivered', count: 620, pct: 49.7, color: '#17b978' },
    { label: 'Processing', count: 320, pct: 25.6, color: '#3b82f6' },
    { label: 'Shipped', count: 200, pct: 16.0, color: '#f59e0b' },
    { label: 'Cancelled', count: 108, pct: 8.7, color: '#f04e55' },
  ];

  ngAfterViewInit() {
    this.buildSalesChart();
    this.buildOrderChart();
    this.initJQueryEffects();
    this.animateCounters();
  }

  buildSalesChart() {
    const labels = ['May 16', 'May 17', 'May 18', 'May 19', 'May 20', 'May 21', 'May 22'];
    const ctx = this.salesChartRef.nativeElement.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(108,60,225,0.18)');
    gradient.addColorStop(1, 'rgba(108,60,225,0)');

    this.salesChartInst = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'This Week',
            data: [8200, 12500, 9800, 18450, 14200, 22500, 28000],
            borderColor: '#6c3ce1',
            backgroundColor: gradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.42,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#6c3ce1',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: 'Last Week',
            data: [6000, 8200, 11000, 9200, 13000, 10500, 16000],
            borderColor: '#c4c9d8',
            borderDash: [5, 4],
            borderWidth: 1.5,
            fill: false,
            tension: 0.42,
            pointRadius: 0,
            pointHoverRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a1040',
            titleFont: { family: 'Rubik', size: 12, weight: 'bold' },
            bodyFont: { family: 'Barlow', size: 12 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: $${Number(ctx.raw).toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Barlow', size: 11 }, color: '#8b93a7' }
          },
          y: {
            grid: { color: '#f1f3f9', lineWidth: 1 },
            ticks: {
              font: { family: 'Barlow', size: 11 },
              color: '#8b93a7',
              callback: (v: any) => v >= 1000 ? '$' + (v / 1000) + 'K' : '$' + v
            }
          }
        }
      }
    });
  }

  buildOrderChart() {
    const ctx = this.orderChartRef.nativeElement.getContext('2d');
    this.orderChartInst = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Delivered', 'Processing', 'Shipped', 'Cancelled'],
        datasets: [{
          data: [620, 320, 200, 108],
          backgroundColor: ['#17b978', '#3b82f6', '#f59e0b', '#f04e55'],
          borderWidth: 4,
          borderColor: '#ffffff',
          hoverBorderWidth: 0,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '74%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a1040',
            titleFont: { family: 'Rubik', size: 12, weight: 'bold' },
            bodyFont: { family: 'Barlow', size: 12 },
            padding: 10,
            cornerRadius: 8,
          }
        }
      }
    });
  }

  initJQueryEffects() {
    if (typeof $ === 'undefined') return;

    $('.stat-dots').on('click', function(this: HTMLElement) {
      $(this).toggleClass('active');
    });

    $('.stat-card').on('mouseenter', function(this: HTMLElement) {
      $(this).find('.stat-icon-wrap').css('transform', 'scale(1.1) rotate(-3deg)');
    }).on('mouseleave', function(this: HTMLElement) {
      $(this).find('.stat-icon-wrap').css('transform', 'scale(1) rotate(0deg)');
    });

    $('.orders-tbl tbody tr').on('click', function(this: HTMLElement) {
      $(this).addClass('row-selected').siblings().removeClass('row-selected');
    });

    $('.search-bar input').on('focus', function(this: HTMLElement) {
      $(this).closest('.search-bar').addClass('focused');
    }).on('blur', function(this: HTMLElement) {
      $(this).closest('.search-bar').removeClass('focused');
    });

    setTimeout(() => {
      $('.ch-bar-fill').each(function(this: HTMLElement) {
        const w = $(this).data('width');
        $(this).css('width', '0%').animate({ width: w + '%' }, 900);
      });
    }, 400);

    setTimeout(() => {
      $('.loc-bar-fill').each(function(this: HTMLElement) {
        const w = $(this).data('width');
        $(this).css('width', '0%').animate({ width: w + '%' }, 900);
      });
    }, 500);
  }

  animateCounters() {
    if (typeof $ === 'undefined') return;
    setTimeout(() => {
      $('.stat-value[data-target]').each(function(this: HTMLElement) {
        const $el = $(this);
        const prefix = $el.data('prefix') || '';
        const suffix = $el.data('suffix') || '';
        const target = parseFloat($el.data('target'));
        $({ val: 0 }).animate({ val: target }, {
          duration: 1200,
          easing: 'swing',
          step: function(this: { val: number }) {
            const display = Number.isInteger(target)
              ? Math.floor(this.val).toLocaleString()
              : this.val.toFixed(2);
            $el.text(prefix + display + suffix);
          },
          complete: function(this: { val: number }) {
            const display = Number.isInteger(target)
              ? target.toLocaleString()
              : target.toFixed(2);
            $el.text(prefix + display + suffix);
          }
        });
      });
    }, 300);
  }

  getStatusClass(s: string) { return 'ss-badge badge-' + s.toLowerCase(); }
  getPaymentClass(p: string) { return 'ss-badge badge-' + p.toLowerCase(); }

  ngOnDestroy() {
    this.salesChartInst?.destroy();
    this.orderChartInst?.destroy();
  }
}
