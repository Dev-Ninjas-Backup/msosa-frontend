import BillingActions from "./components/BillingActions";
import BillingAlerts from "./components/BillingAlerts";
import BillingKpiCards from "./components/BillingKpiCards";
import EncryptionFooter from "./components/EncryptionFooter";
import InvoiceHistory from "./components/InvoiceHistory";
import SubscriptionDetails from "./components/SubscriptionDetails";
import UsageSummary from "./components/UsageSummary";

const Billing = () => (
  <div className="space-y-7 pb-8">
    <BillingActions />
    <BillingKpiCards />
    <BillingAlerts />
    <SubscriptionDetails />
    <UsageSummary />
    <InvoiceHistory />
    <EncryptionFooter />
  </div>
);

export default Billing;
