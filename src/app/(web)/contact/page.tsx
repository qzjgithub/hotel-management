import Link from "next/link";

type PolicyItem = {
  title: string;
  content: string;
};

const policyItems: PolicyItem[] = [
  {
    title: 'Information Collected and Processed',
    content: 'When you access or use our Services, we collect and process information from and about you to provide the Services in a more personalized and relevant way. Some information we collect passively, for example, with our servers or with cookies or other similar tracking technologies. Some information we collect from different sources, including from you, affiliated entities, business partners, and other independent third-party sources. When you use our Services by “clicking-through” from a third-party website or when you visit third-party websites via our Services, those third-party websites may share information with us about your use of their service. Any information that we receive from third-party websites may be combined with the information provided by you.'
  },
  {
    title: 'Information Uses and Purposes',
    content: 'To the extent possible, we want to provide you with relevant content and a tailored experience when you use our Services, and we use information about you to do that, including in the following ways:'
  },
  {
    title: 'Information Sharing',
    content: 'In order to provide some of our Services and processing activities, we use service providers and may need to make available each category of information that we collect to these service providers, and certain other third parties, including our group of companies, in the following circumstances:'
  },
  {
    title: 'Information Choices',
    content: 'You have options with respect to the processing and use of your information by us. You can access, update, and even close your account by visiting the “Member Profile” section on our website or app. In addition, you can do the following:'
  },
  {
    title: 'Information on Children',
    content: 'Our Services are not intended for children, which we consider to be: (i) individuals that are 13 years of age or under, or the age of privacy consent in your jurisdiction; or (ii) when processing data on the basis of a contract, the age of legal capacity to enter into the agreement.'
  },
  {
    title: 'Information Transfers',
    content: 'We offer our Services to users located in many different jurisdictions. If we transfer your information to other countries, we will use and protect that information as described in this Statement and in accordance with applicable law.'
  },
  {
    title: 'Information Security',
    content: 'We have implemented appropriate administrative, technical, and physical security procedures to help protect your information. We only authorize specific personnel to access personal information and they may do so only for permitted business functions. We use encryption when transmitting your information between your system and ours, and between our system and those of the parties with whom we share information. We also employ firewalls and intrusion detection systems to help prevent unauthorized access to your information. However, we cannot guarantee the security of information from unauthorized entry or use, hardware or software failure, or other circumstances outside of our control.'
  },
  {
    title: 'Information Deletion and Retention',
    content: 'We will retain copies of your information for as long as you maintain your account or as necessary in connection with the purposes set out in this Statement, unless applicable law requires a longer retention period. In addition, we may retain your information for the duration of any period necessary to establish, exercise, or defend any legal rights.'
  },
  {
    title: 'Information from Cookies',
    content: 'Cookies are small text files that are automatically placed on your Device when you visit almost any website. They are stored by your internet browser and contain basic information about your internet use. Your browser sends the information from these cookies back to a website every time you revisit it, so it can recognize your Device and improve your experience by, among other things, providing you with personalized content. We also use other tracking technologies, such as pixel, SDKs, or server logs, that have a similar functionality. We also use cookies and tracking technologies to remember your login details, so you don’t have to re-enter them repeatedly when you use our Services or to help us understand your preferences.'
  },
  {
    title: 'Information on Statement Changes',
    content: 'We may update this Statement in the future. If we believe any changes are material, we will let you know by doing one or more of the following: sending you a communication about the changes, placing a notice on the website and/or posting an updated Statement on the website. We will note at the top of this Statement when it was most recently updated. We encourage you to check back from time to time to review the most current version and to periodically review this Statement for the latest information on our privacy practices.'
  }
];

const ContactPage = () => {
  return (
    <div className='container mx-auto px-4'>
      <h1 className='font-bold text-3xl'>
        Contact Us
      </h1>
      <div className='space-y-8 mt-4 text-lg leading-6'>
        <p>
          Have questions or need assistance? We’re here to help! Feel free to reach out to us using the information below.
        </p>
        <p>
          Email: info@yourcompany.com<br/>
          Phone: (123) 456-7890<br/>
          Mailing Address:<br/>
          123 Business Rd,<br/>
          City, State, ZIP<br/>
        </p>
        <p>
          Or use our contact form:<br/>
          <Link href='#'>Contact Form Link</Link>
        </p>
        <p>
          Connect with us on social media:<br/>
          <Link href='#' >Facebook</Link> | <Link href='#' >Twitter</Link> | <Link href='#' >Instagram</Link>
        </p>
        <p>
          Our customer service team is available Monday to Friday, 9 AM to 5 PM. We strive to respond within 24 hours.
        </p>
        <p>
          Your privacy is important to us. Any information you provide will be kept confidential.
        </p>
        <p>
          We look forward to hearing from you!
        </p>
      </div>
    </div>
  )
};

export default ContactPage;
