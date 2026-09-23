export const FINANCIAL_PATH = "/founder/financial-center";
export const INVOICES_PATH = `${FINANCIAL_PATH}/invoices`;
export const invoicePath = (id: string) => `${INVOICES_PATH}/${id}`;

export const FINANCIAL_EXPORT_EVENT = "founder:financial:export";
export const FINANCIAL_TRANSACTIONS_EVENT = "founder:financial:transactions";
export const INVOICES_EXPORT_EVENT = "founder:invoices:export";
export const INVOICES_CREATE_EVENT = "founder:invoices:create";
export const INVOICE_PRINT_EVENT = "founder:invoice:print";
export const INVOICE_DOWNLOAD_EVENT = "founder:invoice:download";
