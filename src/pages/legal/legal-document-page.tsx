import Page from '@/components/page';
import { PATH_PAGE } from '@/routes/paths';
import { Link } from 'react-router';

type DocumentType = 'privacy-policy' | 'terms-and-conditions';

interface LegalSection {
  title: string;
  body: string;
  bullets?: string[];
}

interface LegalDocumentContent {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}

const LEGAL_CONTENT: Record<DocumentType, LegalDocumentContent> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    description:
      'This Privacy Policy explains how KPBoards collects, uses, stores, and protects information when you use our website and application.',
    updatedAt: 'March 15, 2026',
    sections: [
      {
        title: 'Information We Collect',
        body: 'We collect data necessary to provide and improve KPBoards services.',
        bullets: [
          'Account details, such as your name, email, and organization',
          'Usage and technical data, such as device, browser, and access logs',
          'Content and metadata created while using forms, tables, documents, and settings',
        ],
      },
      {
        title: 'How We Use Information',
        body: 'We use collected information to operate the platform safely and effectively.',
        bullets: [
          'Authenticate users, enforce access controls, and secure accounts',
          'Provide core product features and customer support',
          'Monitor reliability, detect abuse, and improve product quality',
        ],
      },
      {
        title: 'Sharing and Disclosure',
        body: 'We do not sell personal information.',
        bullets: [
          'We may share with trusted service providers under confidentiality obligations',
          'We may disclose where required by law, regulation, or legal process',
          'We may share in connection with a merger, acquisition, or reorganization with appropriate safeguards',
        ],
      },
      {
        title: 'Data Retention and Security',
        body: 'We retain information only as needed for legitimate business, contractual, and legal reasons. We apply technical and organizational controls to protect data against unauthorized access, loss, and misuse.',
      },
      {
        title: 'Your Choices and Contact',
        body: 'You may request access, correction, or deletion of your personal data where applicable law permits. For privacy inquiries, contact pldkhoi@gmail.com.',
      },
    ],
  },
  'terms-and-conditions': {
    title: 'Terms and Conditions',
    description:
      'These Terms and Conditions govern your access to and use of KPBoards. By using the service, you agree to these terms.',
    updatedAt: 'March 15, 2026',
    sections: [
      {
        title: 'Eligibility and Account Responsibility',
        body: 'You are responsible for maintaining the confidentiality of account credentials and for all activities occurring under your account.',
      },
      {
        title: 'Permitted Use',
        body: 'You may use KPBoards only for lawful and authorized purposes.',
        bullets: [
          'Do not attempt unauthorized access, interference, or disruption',
          'Do not upload unlawful, harmful, or infringing content',
          'Comply with all applicable laws and organizational policies',
        ],
      },
      {
        title: 'Intellectual Property',
        body: 'KPBoards and related materials are protected by applicable intellectual property laws. You may not copy, modify, or redistribute platform materials beyond permitted use.',
      },
      {
        title: 'Service Changes and Availability',
        body: 'We may update, modify, or discontinue features at any time. We aim for high availability but do not guarantee uninterrupted service.',
      },
      {
        title: 'Disclaimer and Limitation of Liability',
        body: 'To the extent permitted by law, the service is provided on an as-available basis and liability is limited for indirect or consequential losses.',
      },
      {
        title: 'Termination',
        body: 'We may suspend or terminate access for violations of these terms or misuse of the platform.',
      },
      {
        title: 'Contact',
        body: 'For questions regarding these terms, contact pldkhoi@gmail.com.',
      },
    ],
  },
};

interface Props {
  documentType: DocumentType;
}

export default function LegalDocumentPage({ documentType }: Props) {
  const doc = LEGAL_CONTENT[documentType];
  const isPrivacy = documentType === 'privacy-policy';
  const relatedPath = isPrivacy ? PATH_PAGE.termsAndConditions : PATH_PAGE.privacyPolicy;
  const relatedLabel = isPrivacy ? 'View Terms and Conditions' : 'View Privacy Policy';

  return (
    <Page title={doc.title}>
      <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-10 sm:py-12">
        <header className="space-y-3">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Legal
          </span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{doc.title}</h1>
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">{doc.description}</p>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Last updated: {doc.updatedAt}
          </p>
        </header>

        <article className="space-y-4 rounded-2xl border border-border/70 bg-card/60 p-5 sm:p-6">
          {doc.sections.map((section) => (
            <section key={section.title} className="space-y-2">
              <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
              <p className="text-sm leading-6 text-muted-foreground sm:text-[0.95rem]">
                {section.body}
              </p>
              {section.bullets && (
                <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <section className="space-y-2 rounded-2xl border border-border/70 bg-muted/30 p-5">
          <h2 className="text-base font-semibold">Related legal document</h2>
          <Link className="text-sm font-medium text-primary hover:underline" to={relatedPath}>
            {relatedLabel}
          </Link>
        </section>
      </div>
    </Page>
  );
}
