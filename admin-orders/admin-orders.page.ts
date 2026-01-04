import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
  standalone: false,
})
export class AdminOrdersPage implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  searchTerm: string = '';

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    await this.loadOrders();
  }

  async loadOrders() {
    const ordersRef = collection(this.firestore, 'orders');
    const snapshot = await getDocs(ordersRef);
    this.orders = snapshot.docs.map(doc => doc.data());
    this.filteredOrders = this.orders;
  }

  filterOrders() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredOrders = this.orders;
      return;
    }

    this.filteredOrders = this.orders.filter(order =>
      order.email.toLowerCase().includes(term) ||
      order.items.some((item: any) =>
        item.name.toLowerCase().includes(term)
      )
    );
  }

  exportToExcel() {
    const exportData = this.filteredOrders.map(order => ({
      Date: order.createdAt?.toDate().toLocaleString() || '',
      Customer: order.email,
      Total: `${order.totalPrice} lei`,
      Items: order.items.map((i: { name: any; quantity: any; }) => `${i.name} x${i.quantity}`).join(', ')
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = { Sheets: { 'Orders': worksheet }, SheetNames: ['Orders'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'orders.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('All Orders Summary', 14, 14);

    const rows = this.filteredOrders.map(order => [
      order.createdAt?.toDate().toLocaleString() || '',
      order.email,
      `${order.totalPrice} lei`,
      order.items.map((i: { name: any; quantity: any; }) => `${i.name} x${i.quantity}`).join(', ')
    ]);

    autoTable(doc, {
      head: [['Date', 'Customer Email', 'Total', 'Items']],
      body: rows,
      startY: 20,
    });

    doc.save('orders.pdf');
  }
}
