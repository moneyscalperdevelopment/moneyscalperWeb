import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface UserData {
  id: string;
  email: string;
  phone_number: string | null;
  created_at: string;
  email_confirmed_at: string | null;
  sms_verified: boolean;
}

export const exportUsersToPDF = (users: UserData[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;
  
  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Registered Users Report", pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: "center" });
  doc.text(`Total Users: ${users.length}`, pageWidth / 2, yPosition + 5, { align: "center" });
  
  yPosition += 15;
  
  // Users table
  const usersData = users.map(user => [
    user.email,
    user.phone_number || "N/A",
    new Date(user.created_at).toLocaleDateString(),
    user.email_confirmed_at ? "Yes" : "No",
    user.sms_verified ? "Yes" : "No",
  ]);
  
  autoTable(doc, {
    startY: yPosition,
    head: [["Email", "Phone Number", "Registration Date", "Email Verified", "SMS Verified"]],
    body: usersData,
    theme: "striped",
    headStyles: { fillColor: [34, 197, 94], textColor: [255, 255, 255] },
    styles: { fontSize: 8, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 40 },
      2: { cellWidth: 30 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
    },
  });
  
  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Page ${i} of ${totalPages} | Money Scalper User Report | Confidential`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }
  
  // Save PDF
  doc.save(`users-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportUsersToCSV = (users: UserData[]) => {
  let csvContent = "Registered Users Report\n";
  csvContent += `Generated: ${new Date().toLocaleString()}\n`;
  csvContent += `Total Users: ${users.length}\n\n`;
  
  // Headers
  csvContent += "Email,Phone Number,Registration Date,Email Verified,SMS Verified\n";
  
  // User data
  users.forEach(user => {
    const email = user.email;
    const phone = user.phone_number || "N/A";
    const regDate = new Date(user.created_at).toLocaleString();
    const emailVerified = user.email_confirmed_at ? "Yes" : "No";
    const smsVerified = user.sms_verified ? "Yes" : "No";
    
    csvContent += `"${email}","${phone}","${regDate}","${emailVerified}","${smsVerified}"\n`;
  });
  
  // Create download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `users-report-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
