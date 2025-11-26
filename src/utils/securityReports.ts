import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  event_details: any;
  phone_number: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

interface SuspiciousIP {
  id: string;
  ip_address: string;
  reason: string;
  event_count: number;
  first_seen: string;
  last_seen: string;
  blocked: boolean;
}

interface SecurityMetrics {
  total_events: number;
  failed_attempts: number;
  successful_verifications: number;
  rate_limit_violations: number;
  suspicious_ips: number;
}

interface ReportData {
  logs: SecurityLog[];
  suspiciousIPs: SuspiciousIP[];
  metrics: SecurityMetrics;
  startDate: string;
  endDate: string;
}

export const exportToCSV = (data: ReportData) => {
  const { logs, suspiciousIPs, metrics, startDate, endDate } = data;
  
  // Create CSV content
  let csvContent = "Security Report\n";
  csvContent += `Generated: ${new Date().toLocaleString()}\n`;
  csvContent += `Report Period: ${startDate} to ${endDate}\n\n`;
  
  // Summary metrics
  csvContent += "SUMMARY METRICS\n";
  csvContent += "Metric,Value\n";
  csvContent += `Total Events,${metrics.total_events}\n`;
  csvContent += `Successful Verifications,${metrics.successful_verifications}\n`;
  csvContent += `Failed Attempts,${metrics.failed_attempts}\n`;
  csvContent += `Rate Limit Violations,${metrics.rate_limit_violations}\n`;
  csvContent += `Suspicious IPs,${metrics.suspicious_ips}\n`;
  
  const successRate = metrics.total_events > 0 
    ? ((metrics.successful_verifications / (metrics.successful_verifications + metrics.failed_attempts)) * 100).toFixed(2)
    : "0";
  csvContent += `Success Rate,${successRate}%\n\n`;
  
  // Security logs
  csvContent += "SECURITY LOGS\n";
  csvContent += "Timestamp,Event Type,IP Address,Phone Number,User ID,Details\n";
  logs.forEach(log => {
    const timestamp = new Date(log.created_at).toLocaleString();
    const eventType = log.event_type.replace(/,/g, ";");
    const ipAddress = log.ip_address || "N/A";
    const phoneNumber = log.phone_number || "N/A";
    const userId = log.user_id.substring(0, 8) + "...";
    const details = JSON.stringify(log.event_details).replace(/,/g, ";").substring(0, 100);
    
    csvContent += `"${timestamp}","${eventType}","${ipAddress}","${phoneNumber}","${userId}","${details}"\n`;
  });
  
  csvContent += "\n";
  
  // Suspicious IPs
  csvContent += "SUSPICIOUS IP ADDRESSES\n";
  csvContent += "IP Address,Reason,Event Count,First Seen,Last Seen,Status\n";
  suspiciousIPs.forEach(ip => {
    const firstSeen = new Date(ip.first_seen).toLocaleString();
    const lastSeen = new Date(ip.last_seen).toLocaleString();
    const status = ip.blocked ? "BLOCKED" : "Active";
    const reason = ip.reason.replace(/,/g, ";");
    
    csvContent += `"${ip.ip_address}","${reason}",${ip.event_count},"${firstSeen}","${lastSeen}","${status}"\n`;
  });
  
  // Create download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `security-report-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (data: ReportData) => {
  const { logs, suspiciousIPs, metrics, startDate, endDate } = data;
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;
  
  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Security Compliance Report", pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 5;
  doc.text(`Report Period: ${startDate} to ${endDate}`, pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 15;
  
  // Executive Summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", 14, yPosition);
  
  yPosition += 10;
  
  const successRate = metrics.total_events > 0 
    ? ((metrics.successful_verifications / (metrics.successful_verifications + metrics.failed_attempts)) * 100).toFixed(2)
    : "0";
  
  const failureRate = metrics.total_events > 0 
    ? ((metrics.failed_attempts / (metrics.successful_verifications + metrics.failed_attempts)) * 100).toFixed(2)
    : "0";
  
  // Summary metrics table
  autoTable(doc, {
    startY: yPosition,
    head: [["Metric", "Value"]],
    body: [
      ["Total Security Events", metrics.total_events.toString()],
      ["Successful Verifications", metrics.successful_verifications.toString()],
      ["Failed Verification Attempts", metrics.failed_attempts.toString()],
      ["Rate Limit Violations", metrics.rate_limit_violations.toString()],
      ["Suspicious IP Addresses Detected", metrics.suspicious_ips.toString()],
      ["Verification Success Rate", `${successRate}%`],
      ["Verification Failure Rate", `${failureRate}%`],
    ],
    theme: "grid",
    headStyles: { fillColor: [34, 197, 94], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });
  
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  
  // Check if we need a new page
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  
  // Security Logs Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Recent Security Events", 14, yPosition);
  
  yPosition += 10;
  
  const logsData = logs.slice(0, 50).map(log => [
    new Date(log.created_at).toLocaleString(),
    log.event_type.replace(/_/g, " "),
    log.ip_address || "N/A",
    log.phone_number ? log.phone_number.slice(0, -4) + "****" : "N/A",
  ]);
  
  autoTable(doc, {
    startY: yPosition,
    head: [["Timestamp", "Event Type", "IP Address", "Phone"]],
    body: logsData,
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 50 },
      2: { cellWidth: 40 },
      3: { cellWidth: 35 },
    },
  });
  
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  
  // Suspicious IPs Section
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Suspicious IP Addresses", 14, yPosition);
  
  yPosition += 10;
  
  if (suspiciousIPs.length > 0) {
    const ipsData = suspiciousIPs.map(ip => [
      ip.ip_address,
      ip.reason,
      ip.event_count.toString(),
      new Date(ip.first_seen).toLocaleDateString(),
      ip.blocked ? "BLOCKED" : "Active",
    ]);
    
    autoTable(doc, {
      startY: yPosition,
      head: [["IP Address", "Reason", "Events", "First Seen", "Status"]],
      body: ipsData,
      theme: "striped",
      headStyles: { fillColor: [239, 68, 68], textColor: [255, 255, 255] },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 60 },
        2: { cellWidth: 20 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 },
      },
    });
  } else {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("No suspicious IP addresses detected during this period.", 14, yPosition);
  }
  
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  
  // Recommendations Section
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Security Recommendations", 14, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const recommendations = [];
  
  if (parseFloat(failureRate) > 20) {
    recommendations.push("• High failure rate detected. Review OTP delivery mechanisms and user guidance.");
  }
  
  if (metrics.rate_limit_violations > metrics.total_events * 0.1) {
    recommendations.push("• Significant rate limiting activity. Consider reviewing rate limit thresholds.");
  }
  
  if (suspiciousIPs.length > 5) {
    recommendations.push("• Multiple suspicious IPs detected. Consider implementing additional security measures.");
  }
  
  if (recommendations.length === 0) {
    recommendations.push("• No significant security concerns detected. Continue monitoring.");
  }
  
  recommendations.forEach(rec => {
    doc.text(rec, 14, yPosition);
    yPosition += 7;
  });
  
  // Footer on each page
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Page ${i} of ${totalPages} | Money Scalper Security Report | Confidential`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }
  
  // Save PDF
  doc.save(`security-report-${new Date().toISOString().split('T')[0]}.pdf`);
};
