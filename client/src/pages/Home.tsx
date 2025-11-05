import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Download, QrCode, FileText, Sparkles } from "lucide-react";
import QRCode from "qrcode";
import { generateVCF, downloadVCF, type VCardData } from "@/lib/vcf";
import { APP_TITLE } from "@/const";

export default function Home() {
  const [formData, setFormData] = useState<VCardData>({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    jobTitle: "",
    notes: "",
  });

  const [vcfContent, setVcfContent] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("form");
  const [qrColor, setQrColor] = useState<string>("#000000");
  const [qrBgColor, setQrBgColor] = useState<string>("#FFFFFF");
  const [transparentBg, setTransparentBg] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (field: keyof VCardData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateVCF = () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const vcf = generateVCF(formData);
    setVcfContent(vcf);
    toast.success("Fichier VCF généré avec succès!");
    setActiveTab("qrcode");
  };

  const handleDownloadVCF = () => {
    if (!vcfContent) {
      toast.error("Veuillez d'abord générer un fichier VCF");
      return;
    }
    const fileName = formData.fullName
      ? `${formData.fullName.replace(/\s+/g, "_")}.vcf`
      : "contact.vcf";
    downloadVCF(vcfContent, fileName);
    toast.success("Fichier VCF téléchargé!");
  };

  const handleGenerateQR = async () => {
    if (!vcfContent) {
      toast.error("Veuillez d'abord générer un fichier VCF");
      return;
    }

    try {
      const url = await QRCode.toDataURL(vcfContent, {
        width: 400,
        margin: 2,
        color: {
          dark: qrColor,
          light: transparentBg ? "#00000000" : qrBgColor,
        },
      });
      setQrCodeUrl(url);
      toast.success("QR Code généré avec succès!");
    } catch (error) {
      toast.error("Erreur lors de la génération du QR Code");
      console.error(error);
    }
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) {
      toast.error("Veuillez d'abord générer un QR Code");
      return;
    }
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = formData.fullName
      ? `${formData.fullName.replace(/\s+/g, "_")}_qrcode.png`
      : "contact_qrcode.png";
    link.click();
    toast.success("QR Code téléchargé!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {APP_TITLE}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Créez facilement vos cartes de visite numériques au format VCF et générez des QR codes pour un partage instantané
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="form" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Formulaire VCF
              </TabsTrigger>
              <TabsTrigger value="qrcode" className="flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                QR Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de contact</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire ci-dessous pour générer votre fichier VCF
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">
                        Nom complet <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Jean Dupont"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        placeholder="Mon Entreprise"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Téléphone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jean.dupont@exemple.fr"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Titre du poste</Label>
                      <Input
                        id="jobTitle"
                        placeholder="Directeur Commercial"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Site web</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://www.exemple.fr"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      placeholder="123 Rue de la Paix, 75001 Paris"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Informations complémentaires..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={handleGenerateVCF}
                      className="flex-1 gap-2"
                      size="lg"
                    >
                      <FileText className="w-5 h-5" />
                      Générer VCF
                    </Button>
                    <Button
                      onClick={handleDownloadVCF}
                      variant="outline"
                      className="flex-1 gap-2"
                      size="lg"
                      disabled={!vcfContent}
                    >
                      <Download className="w-5 h-5" />
                      Télécharger VCF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qrcode">
              <Card>
                <CardHeader>
                  <CardTitle>Générateur de QR Code</CardTitle>
                  <CardDescription>
                    Générez un QR code à partir de votre fichier VCF pour un partage facile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!vcfContent ? (
                    <div className="text-center py-12">
                      <QrCode className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Vous devez d'abord générer un fichier VCF
                      </p>
                      <Button onClick={() => setActiveTab("form")} variant="outline">
                        Retour au formulaire
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="qrColor">Couleur du QR Code</Label>
                            <div className="flex gap-2">
                              <Input
                                id="qrColor"
                                type="color"
                                value={qrColor}
                                onChange={(e) => setQrColor(e.target.value)}
                                className="w-20 h-10 cursor-pointer"
                              />
                              <Input
                                type="text"
                                value={qrColor}
                                onChange={(e) => setQrColor(e.target.value)}
                                placeholder="#000000"
                                className="flex-1"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="qrBgColor">Couleur du fond</Label>
                            <div className="flex gap-2">
                              <Input
                                id="qrBgColor"
                                type="color"
                                value={qrBgColor}
                                onChange={(e) => setQrBgColor(e.target.value)}
                                className="w-20 h-10 cursor-pointer"
                                disabled={transparentBg}
                              />
                              <Input
                                type="text"
                                value={qrBgColor}
                                onChange={(e) => setQrBgColor(e.target.value)}
                                placeholder="#FFFFFF"
                                className="flex-1"
                                disabled={transparentBg}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="transparentBg"
                            checked={transparentBg}
                            onChange={(e) => setTransparentBg(e.target.checked)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <Label htmlFor="transparentBg" className="cursor-pointer">
                            Fond transparent
                          </Label>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-6">
                        {qrCodeUrl ? (
                          <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-primary/20">
                            <img
                              src={qrCodeUrl}
                              alt="QR Code"
                              className="w-full max-w-sm"
                            />
                          </div>
                        ) : (
                          <div className="bg-muted/30 p-12 rounded-lg border-2 border-dashed border-muted-foreground/30">
                            <QrCode className="w-24 h-24 text-muted-foreground/50" />
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          <Button
                            onClick={handleGenerateQR}
                            className="flex-1 gap-2"
                            size="lg"
                          >
                            <QrCode className="w-5 h-5" />
                            Générer QR Code
                          </Button>
                          <Button
                            onClick={handleDownloadQR}
                            variant="outline"
                            className="flex-1 gap-2"
                            size="lg"
                            disabled={!qrCodeUrl}
                          >
                            <Download className="w-5 h-5" />
                            Télécharger QR Code
                          </Button>
                        </div>
                      </div>

                      {vcfContent && (
                        <div className="mt-6">
                          <Label>Aperçu du fichier VCF</Label>
                          <pre className="mt-2 p-4 bg-muted/50 rounded-lg text-xs overflow-x-auto border">
                            {vcfContent}
                          </pre>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
