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

const PrivacyPage = () => {
  return (
    <div className='container mx-auto px-4'>
      <h1 className='font-bold text-3xl'>
        Privacy and Cookies Statement
      </h1>
      <div className='space-y-8 mt-4 text-lg leading-6'>
        <p>
          We owns and operates an online platform that provides users with information, recommendations and services related to travel and leisure, including tools for researching and/or booking hotels, rentals and other accommodations, attractions and experiences, restaurants, flights, and cruises, among other leisure-related services. In this Statement, we refer to these as our “Services”.
        </p>
        <p>
          The information that you and others entrust us with enhances our ability to provide more relevant, personalized and helpful Services. We know that sharing your information with us is based on trust. We take your trust in us seriously and are committed to providing you helpful information, products and services, curated based on the information you have shared with us. Equally, and perhaps more importantly, we are committed to respecting your privacy when you visit our website or use our Services and being transparent about how we use the information you have entrusted to us.
        </p>
        <p>
          This Statement describes how we obtain, use, and process your information. It informs you of the rights you have, how you can exercise them and how you can contact us. Please review this Statement carefully to learn about our practices with respect to information and privacy. By visiting our websites and related mobile applications, as well as other online platforms such as our affiliated partners’ websites, apps and social media, whether on a computer, phone, tablet, or similar device (each of these is referred to as a “Device”), you acknowledge and confirm that you have read this Statement.
        </p>
        <p>
          We offer our Services to users in a number of countries and territories where the laws and customs differ. This Statement provides a general overview of our privacy practices. In addition, Sections 12 through 15 of this Statement provide specific information relevant to users residing in certain regions or countries.
        </p>
      </div>
      <div className='py-4'>
        <table
          cellPadding={5}
          cellSpacing={0}
          className='w-full border-2 border-solid border-black text-base'
        >
          <tbody>
            <tr>
              <td className='space-y-3 p-3'>
                <p className='text-center font-medium text-lg underline py-4'>
                  Notice at Collection of Personal Information
                </p>
                <p>
                  We collect personal information from and about you as detailed in this Notice at Collection of Personal Information (“Notice”) and in the Statement.
                </p>
              </td>
            </tr>
            <tr className='border-t-2 border-black'>
              <td className='p-3 space-y-3 px-6'>
                <p className='text-center font-medium text-lg underline py-4'>
                  What categories of personal information do we collect and why?
                </p>
                <ul className='list-disc px-6 space-y-3'>
                  <li>
                    Biographical information & identifiers: This may include your name; phone number, postal, billing, and email address; other information about yourself that you have voluntarily disclosed; unique personal identifier; online identifier; IP address; account username and password; and other similar identifiers.
                  </li>
                  <li>
                    Personal information categories listed in the California customer records statute: This may include your billing and payment card information and certain information that you provide to support your travel and planning, such as a driver’s license number, passport number or trip insurance policy number.
                  </li>
                  <li>
                    Characteristics of Protected Classifications under Applicable Law: This may include your age range, gender, and any other information about yourself that you have voluntarily disclosed. We may also collect race, ethnicity, sexual orientation, or religion where you voluntarily disclose it to us, including, for example, in the context of diversity and inclusivity disclosures you choose to make.
                  </li>
                  <li>
                    Commercial Information: This may include information related to products or services that you have purchased or obtained, including details of your membership with Tripadvisor, purchasing and booking history, information about your travel, experience and dining plans and preferences, and any other information about your travel plans that you have voluntarily disclosed.
                  </li>
                  <li>
                    Internet or other Electronic Network Activity Information: This may include information related to your browsing history (including pages you have visited, content reviewed, and apps reviewed), search history, and access to and use of our Services (including automatic collection of information as described in more detail in this Statement).
                  </li>
                  <li>
                    Precise Geolocation Data: This may include the location of your Device when you have agreed to share your location information via privacy settings on your Device or, for example, if you have uploaded photos tagged with location information.
                  </li>
                  <li>
                    Visual and Audio Information: This may include photos, reviews, forum and social posts, and videos that you may provide to us. In addition, we collect communications when you contact our customer service team, including inbound and outbound calls. 
                  </li>
                  <li>
                    Inferences Drawn from the Above: We may generate inferences based on the above categories of personal information.
                  </li>
                  <li>
                    Sensitive Personal Information: The following categories are considered “sensitive personal information” under certain privacy laws: precise geolocation data, race, ethnicity, sexual orientation, religion, driver’s license number, or passport number. To the extent that we use or disclose any “sensitive personal information” or “sensitive data”, as those terms are defined in applicable privacy laws, we do not use or disclose the sensitive personal information for the purpose of inferring characteristics about you or for any purpose other than limited permissible purposes, such as providing our Services and verifying, maintaining the quality of, and improving our Services.
                  </li>
                </ul>
                <p>
                  We collect and use each category of personal information for the following business and commercial purposes described in more detail in Section 2 of the Statement: registration, membership and other contracts, to improve our Services, personalisation and customization, communication, and legal compliance.
                </p>
                <p>
                  We will retain copies of your information for as long as you maintain your account or as necessary in connection with the purposes set out in the Statement, unless applicable law requires a longer retention period. In addition, we may retain your information for the duration of any period necessary to establish, exercise, or defend any legal rights.
                </p>
              </td>
            </tr>
            <tr className='border-t-2 border-black'>
              <td className='p-3 space-y-3 px-6'>
                <p className='text-center font-medium text-lg underline py-4'>
                  What categories of personal information do we “sell” or “share” to third parties?
                </p>
                <p>
                  The terms “sell” and “share” are broadly defined in certain U.S. privacy laws. We may “sell” or “share” the following categories of personal information to business partners, social media websites, advertising networks, data aggregators, and other third parties identified in Section 3 of this Statement for purposes of delivering interest-based advertising, analysing use of our websites and apps, and enhancing user engagement on our websites and apps and on social media: biographical information/identifiers, Internet or other electronic network activity information, commercial information, and inferences drawn from the above. We do not knowingly sell or share personal information of individuals under the age of 16.
                </p>
                <p>
                If you would like to opt out of the sale or sharing of your personal information, you may do so by clicking on the “Do Not Sell or Share My Personal Information” link on our homepage/app. You may also use a universal tool that automatically communicates your opt-out preferences, such as the Global Privacy Control (“GPC”).  We will process the GPC signal as a request to opt out.  Please note that we may still use your information for the other purposes described in this Statement, such as those necessary to provide our Services to you.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='py-4 flex flex-col gap-6'>
        {
          policyItems.map((item, index) => (
            <SinlePolicyItem
              key={index}
              title={item.title}
              content={item.content}
              idx={index}
            />
          ))
        }
      </div>
    </div>
  )
};

type SinglePolicyItem = {
  title: string;
  content: string;
  idx: number;
};

const SinlePolicyItem = ({title, content, idx}: SinglePolicyItem) => {
  return (
    <div>
      <p className='text-[#01AF87] font-bold text-lg py-2'>
        {idx + 1}. {title}
      </p>
      <p className='text-lg leading-6'>
        {content}
      </p>
    </div>
  );
};

export default PrivacyPage;
