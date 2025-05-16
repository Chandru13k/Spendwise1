
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Download, Upload, FileSpreadsheet, FileText, History } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from 'sonner';

export function DataImportExportPage() {
  const handleImport = () => {
    toast.info('File upload dialog would appear here');
  };
  
  const handleExport = (format: string) => {
    toast.success(`Exporting data in ${format} format`);
  };
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Data Import/Export</h1>
      
      <Tabs defaultValue="import" className="w-full">
        <TabsList>
          <TabsTrigger value="import">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="h-4 w-4 mr-2" />
            Export
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="import" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Import from File</CardTitle>
                <CardDescription>Upload data from CSV, Excel, or other formats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                  <FileSpreadsheet className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="mb-2">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports .csv, .xlsx, .xls formats</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleImport} className="w-full">Import Data</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connect External Account</CardTitle>
                <CardDescription>Sync data from your bank or other services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <div className="w-6 h-6 mr-2 bg-blue-500 rounded-full" />
                    Connect Bank Account
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <div className="w-6 h-6 mr-2 bg-green-500 rounded-full" />
                    Connect Credit Card
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <div className="w-6 h-6 mr-2 bg-purple-500 rounded-full" />
                    Connect Payment App
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  We use bank-level encryption to keep your credentials secure.
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="export" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <FileSpreadsheet className="h-5 w-5 mr-2" />
                  CSV Format
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Export your data in CSV format for use in spreadsheet applications.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleExport('CSV')} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <FileSpreadsheet className="h-5 w-5 mr-2" />
                  Excel Format
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Export your data in Excel format with formatted sheets and formulas.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleExport('Excel')} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export as Excel
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  PDF Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Generate a comprehensive PDF report with charts and analysis.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleExport('PDF')} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Generate PDF
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <div className="border rounded-lg">
            <div className="p-4 border-b bg-muted/20">
              <h3 className="font-medium">Recent Data Operations</h3>
            </div>
            <div className="divide-y">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">CSV Export</p>
                  <p className="text-sm text-muted-foreground">All transactions</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Today, 2:30 PM</p>
                  <Button variant="link" className="h-auto p-0">Download again</Button>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Excel Import</p>
                  <p className="text-sm text-muted-foreground">budget_2025.xlsx</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Yesterday, 10:15 AM</p>
                  <Button variant="link" className="h-auto p-0">View details</Button>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">PDF Report</p>
                  <p className="text-sm text-muted-foreground">March 2025 Summary</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Apr 1, 2025</p>
                  <Button variant="link" className="h-auto p-0">Download again</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
