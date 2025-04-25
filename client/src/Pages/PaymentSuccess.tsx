import React from "react";
import { jsPDF } from "jspdf";

const PaymentSuccess = () => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Set background color
    doc.setFillColor(240, 240, 240); // Light gray background (RGB)
    doc.rect(0, 0, 210, 297, "F"); // Full-page rectangle (A4 size: 210mm x 297mm)

    // Add content to the PDF
    doc.setFontSize(20);
    doc.setTextColor("#007bff");
    doc.text("Lapify.com", 105, 20, { align: "center" });

    doc.setDrawColor(0, 0, 0);
    doc.line(10, 25, 200, 25);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Payment Receipt", 105, 35, { align: "center" });

    // Example payment details
    const paymentDetails = [
      { label: "Order ID", value: "123456789" },
      { label: "Product Name", value: "Product 1" },
      { label: "Amount Paid", value: "₹500" },
      { label: "Payment Date", value: new Date().toLocaleDateString() },
    ];

    // Add payment details
    let y = 50;
    doc.setFontSize(12);
    paymentDetails.forEach((detail) => {
      doc.text(`${detail.label}:`, 20, y);
      doc.text(detail.value, 80, y);
      y += 10;
    });

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for shopping with us!", 105, 280, { align: "center" });
    doc.text("For any queries, contact support@lapify.com", 105, 285, { align: "center" });

    // Save the PDF
    doc.save("payment_receipt.pdf");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful</h1>
      <p>Thank you for your payment!</p>
      <button
        onClick={handleDownload}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download Receipt
      </button>
    </div>
  );
};

export default PaymentSuccess;