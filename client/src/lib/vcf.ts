export interface VCardData {
  fullName: string;
  company?: string;
  phone: string;
  email: string;
  address?: string;
  website?: string;
  jobTitle?: string;
  notes?: string;
}

export function generateVCF(data: VCardData): string {
  const lines: string[] = [];
  
  lines.push('BEGIN:VCARD');
  lines.push('VERSION:3.0');
  
  // Nom complet
  if (data.fullName) {
    const nameParts = data.fullName.trim().split(' ');
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
    lines.push(`N:${lastName};${firstName};;;`);
    lines.push(`FN:${data.fullName}`);
  }
  
  // Entreprise
  if (data.company) {
    lines.push(`ORG:${data.company}`);
  }
  
  // Titre du poste
  if (data.jobTitle) {
    lines.push(`TITLE:${data.jobTitle}`);
  }
  
  // Téléphone
  if (data.phone) {
    lines.push(`TEL;TYPE=CELL:${data.phone}`);
  }
  
  // Email
  if (data.email) {
    lines.push(`EMAIL:${data.email}`);
  }
  
  // Adresse
  if (data.address) {
    lines.push(`ADR;TYPE=WORK:;;${data.address};;;;`);
  }
  
  // Site web
  if (data.website) {
    lines.push(`URL:${data.website}`);
  }
  
  // Notes
  if (data.notes) {
    lines.push(`NOTE:${data.notes}`);
  }
  
  lines.push('END:VCARD');
  
  return lines.join('\r\n');
}

export function downloadVCF(vcfContent: string, fileName: string = 'contact.vcf'): void {
  const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
