import { useState, useEffect } from "react";

const BACKEND_TYPES = [
  "Identity Authentication",
  "Local Identity Directory",
  "SAP Application Server ABAP",
  "SAP S/4HANA On-Premise",
  "SAP S/4HANA Cloud Public Edition",
  "SAP SuccessFactors",
  "SAP Ariba Applications",
  "SAP Analytics Cloud",
  "SAP Concur",
  "SAP FieldGlass",
  "SAP Sales Cloud and Service Cloud",
  "SAP BTP XS Advanced UAA",
  "SAP Build Work Zone",
  "Microsoft Active Directory",
  "Microsoft Azure Active Directory",
  "LDAP Server",
  "Generic SCIM System",
];

const CLOUD_TYPES = new Set([
  "Identity Authentication",
  "Local Identity Directory",
  "SAP S/4HANA Cloud Public Edition",
  "SAP SuccessFactors",
  "SAP Ariba Applications",
  "SAP Analytics Cloud",
  "SAP Concur",
  "SAP FieldGlass",
  "SAP Sales Cloud and Service Cloud",
  "SAP BTP XS Advanced UAA",
  "SAP Build Work Zone",
  "Microsoft Azure Active Directory",
  "Generic SCIM System",
]);
const isCloud = (bt: string) => CLOUD_TYPES.has(bt);

const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
    {children}
    {required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

const Field = ({
  label,
  placeholder,
  required,
  hint,
  type = "text",
  value,
  disabled,
}: {
  label?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
}) => (
  <div>
    {label && <Label required={required}>{label}</Label>}
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      disabled={disabled}
      className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all hover:border-gray-300 placeholder:text-gray-300
        ${disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-800"}`}
    />
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

const Dropdown = ({
  label,
  required,
  options,
  value,
  onChange,
  hint,
  disabled,
}: {
  label?: string;
  required?: boolean;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  hint?: string;
  disabled?: boolean;
}) => (
  <div>
    {label && <Label required={required}>{label}</Label>}
    <select
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all hover:border-gray-300
        ${disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-800"}`}
    >
      <option value="" hidden>
        Select an option
      </option>

      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

const Notice = ({ type = "info", children }: { type?: "info" | "warning" | "success"; children: React.ReactNode }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };
  return <div className={`rounded-xl border px-4 py-3 text-sm ${styles[type]}`}>{children}</div>;
};

const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-4">
    <h3 className="text-sm font-bold text-gray-800">{title}</h3>
    {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
  </div>
);

function SetupPanel({ onComplete }: { onComplete: () => void }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
        <p className="text-sm font-semibold text-gray-700">
          {downloaded ? "Script downloaded — run it as Administrator" : "Download the automated setup script"}
        </p>
        <p className="text-xs text-gray-500">
          {downloaded
            ? 'Right-click the downloaded .bat file → "Run as Administrator".'
            : "A batch script will be downloaded. It installs JDK, extracts and starts Cloud Connector automatically."}
        </p>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all"
        >
          {downloaded ? "Download Again" : "Download setup-cloud-connector.bat"}
        </button>
      </div>

      {downloaded && (
        <div className="space-y-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide">Run the script</p>
            <ol className="space-y-2">
              {[
                "Open your Downloads folder",
                "Right-click setup-cloud-connector.bat",
                'Select "Run as Administrator"',
                "The script installs JDK, starts Cloud Connector and opens localhost:8443 automatically",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-600">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <Notice type="warning">
            When the browser opens <strong>localhost:8443</strong>, accept the certificate warning then login with{" "}
            <strong>Administrator / manage</strong>.
          </Notice>
        </div>
      )}
    </div>
  );
}

export default function SourceSystemSetup() {
  const [bt, setBt] = useState<string>("");
  const [hasCC, setHasCC] = useState<"yes" | "no" | null>(null);
  const [setupDone, setSetupDone] = useState(false);

  const cloud = bt ? isCloud(bt) : false;
  const onPrem = bt ? !cloud : false;

  useEffect(() => {
    setHasCC(null);
    setSetupDone(false);
  }, [bt]);

  const showCCQuestion = onPrem;
  const showExistingCC = onPrem && hasCC === "yes";
  const showAutoSetup = onPrem && hasCC === "no";
  const showChangePwd = onPrem && hasCC === "no" && setupDone;
  const showBTPFields = onPrem && hasCC === "no" && setupDone;
  const showMapping = onPrem && (hasCC === "yes" || (hasCC === "no" && setupDone));
  const showCloudForm = cloud;
  const showSave = showMapping || showCloudForm;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-3">
        <div className="mb-6 text-center">
          <h1 className="text-base font-bold text-gray-900">Source System Configuration</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {/* ① Back-end Type */}
          <div className="p-6">
            <SectionHeader
              title="Back-end Type"
              description="Select the type of SAP system you are reading users from."
            />
            <Dropdown required value={bt} onChange={setBt} options={BACKEND_TYPES} />
          </div>

          {/* ② Deployment Mode */}
          <div className="p-6">
            <SectionHeader title="Deployment Mode" />
            <div
              className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300
              ${cloud ? "border-indigo-200 bg-indigo-50" : "border-blue-200 bg-blue-50"}`}
            >
              <div>
                <p className={`text-sm font-bold ${cloud ? "text-indigo-700" : "text-blue-700"}`}>
                  {cloud ? "Cloud" : "On-Premises"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {cloud
                    ? "Direct HTTP connection — no Cloud Connector required"
                    : "Cloud Connector required to tunnel into your SAP backend"}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0
                ${cloud ? "bg-indigo-100 text-indigo-700" : "bg-blue-100 text-blue-700"}`}
              >
                {cloud ? "HTTP / HTTPS" : "RFC / HTTP"}
              </span>
            </div>
          </div>

          {/* ③ Cloud Connector question */}
          {showCCQuestion && (
            <div className="p-6">
              <SectionHeader
                title="Cloud Connector"
                description="A Cloud Connector instance is required to route traffic from SAP BTP to your on-premises backend."
              />
              <p className="text-xs text-gray-500 mb-3">
                Is Cloud Connector already installed and running on this machine?
              </p>
              <div className="flex gap-3">
                {[
                  { val: "yes" as const, label: "Yes, it is installed" },
                  { val: "no" as const, label: "No, set it up for me" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setHasCC(opt.val)}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-150
                      ${
                        hasCC === opt.val
                          ? opt.val === "yes"
                            ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                            : "border-blue-400 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ④a Existing CC credentials */}
          {showExistingCC && (
            <div className="p-6">
              <SectionHeader
                title="Cloud Connector Credentials"
                description="Provide the credentials for your running Cloud Connector instance."
              />
              <div className="space-y-4">
                <Field
                  label="Cloud Connector URL"
                  value="https://localhost:8443"
                  required
                  hint="Default URL: https://localhost:8443"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Username" value="Administrator" required />
                  <Field label="Password" type="password" placeholder="Enter password" required />
                </div>
              </div>
            </div>
          )}

          {/* ④b Automated Setup */}
          {showAutoSetup && (
            <div className="p-6">
              <SectionHeader
                title="Automated Setup"
                description="Download and run the batch script. It installs JDK, extracts Cloud Connector, and starts it — fully automated."
              />
              <SetupPanel onComplete={() => setSetupDone(true)} />
            </div>
          )}

          {/* ⑤ Change Password */}
          {showChangePwd && (
            <div className="p-6">
              <SectionHeader
                title="Change Administrator Password"
                description="The default password must be changed before continuing."
              />
              <Notice type="warning">
                Default credentials were used for initial login (<strong>Administrator / manage</strong>). Set a new
                password to secure your instance.
              </Notice>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Field
                  label="New Password"
                  type="password"
                  required
                  placeholder="Min 8 chars"
                  hint="At least 1 uppercase, 1 number, 1 special character"
                />
                <Field label="Confirm Password" type="password" required placeholder="Re-enter password" />
              </div>
            </div>
          )}

          {/* ⑥ BTP Subaccount */}
          {showBTPFields && (
            <div className="p-6">
              <SectionHeader
                title="BTP Subaccount"
                description="Connect your Cloud Connector to your SAP BTP subaccount."
              />
              <div className="grid grid-cols-2 gap-4">
                <Dropdown
                  label="Region"
                  required
                  options={[
                    "cf.eu10.hana.ondemand.com",
                    "cf.us10.hana.ondemand.com",
                    "cf.ap10.hana.ondemand.com",
                    "cf.ap21.hana.ondemand.com",
                    "cf.br10.hana.ondemand.com",
                    "hanatrial.ondemand.com",
                  ]}
                  hint="Your SAP BTP region host"
                />
                <Field
                  label="Subaccount ID"
                  required
                  placeholder="e.g. 653ffe4e-ed14-4291..."
                  hint="Found in BTP Cockpit → Overview"
                />
                <Field label="Subaccount Username" required placeholder="email@company.com" />
                <Field label="Subaccount Password" required type="password" placeholder="••••••••" />
              </div>
            </div>
          )}

          {/* ⑦ System Mapping */}
          {showMapping && (
            <div className="p-6">
              <SectionHeader
                title="System Mapping"
                description="Define the virtual-to-internal host mapping for your SAP backend."
              />
              <div className="grid grid-cols-2 gap-4">
                <Dropdown label="Protocol" required options={["RFC", "HTTP"]} />
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Back-end Type</label>
                  <div className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500">
                    {bt}
                  </div>
                </div>
                <Field
                  label="Virtual Host"
                  required
                  placeholder="sap.virtual.cloud"
                  hint="Virtual hostname exposed to BTP"
                />
                <Field label="Virtual Port" required placeholder="e.g. 443" hint="Virtual port exposed to BTP" />
                <Field
                  label="Internal Host"
                  required
                  placeholder="sap.internal.local"
                  hint="Hostname of the on-prem SAP system"
                />
                <Field label="Internal Port" required placeholder="e.g. 443" hint="Port of the SAP backend" />
                <Field label="SAProuter" placeholder="/H/router/S/3299" hint="Optional — only if SAProuter is in use" />
                <Field label="System ID" required placeholder="e.g. HHJ" hint="3-character SAP System ID" />
                <Dropdown label="Principal Type" required options={["None", "Kerberos"]} />
                <Field
                  label="SNC Partner Name"
                  placeholder="p:CN=SAP..."
                  hint="Optional — required when Principal Type is Kerberos"
                />
                <Field label="Host in Request Header" placeholder="Use Virtual Host" hint="Optional override" />
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    System Certificate for Logon
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300" />
                    Enable certificate-based logon
                  </label>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
                  <textarea
                    placeholder="Optional description for this system mapping"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all hover:border-gray-300 placeholder:text-gray-300 resize-none h-20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ⑧ Cloud HTTP/HTTPS Connection */}
          {showCloudForm && (
            <div className="p-6">
              <SectionHeader
                title="HTTP / HTTPS Connection"
                description="Configure the connection details for your cloud SAP source system."
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Field
                    label="URL"
                    required
                    placeholder="https://<account>.successfactors.com"
                    hint="Your SAP cloud source system endpoint URL"
                  />
                </div>
                <Dropdown
                  label="Type"
                  required
                  options={["HTTP", "HTTPS"]}
                  hint="Use HTTPS for secure connections (recommended)"
                />
                <Dropdown
                  label="Authentication"
                  required
                  options={["BasicAuthentication", "ClientCertificateAuthentication"]}
                />
                <Field label="User" required placeholder="OAuth Client Key" hint="OAuth client key for your tenant" />
                <Field label="Password" required type="password" placeholder="••••••••" hint="OAuth client secret" />
                <Field
                  label="Client ID"
                  placeholder="OAuth Client ID"
                  hint="Required for ClientCertificateAuthentication"
                />
                <Field label="SAP Client" placeholder="e.g. 100" hint="SAP client number" />
              </div>
            </div>
          )}

          {/* Save */}
          {showSave && (
            <div className="p-6">
              <button
                onClick={() => {}}
                className="w-full py-3 rounded-xl text-sm font-bold bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200"
              >
                Save Source System
              </button>
            </div>
          )}
        </div>
        <p className="text-center text-xs text-gray-400 pb-4">SAP Connectivity Automation</p>
      </div>
    </div>
  );
}
