import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGlobe } from 'react-icons/fa';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-orange-50 rounded-full transition-all group"
                        >
                            <FaArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
                        </button>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <FaGlobe className="w-4 h-4 text-gray-600" />
                                <span className="text-xs text-gray-600">English</span>
                            </div>
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                                PRIVACY POLICY
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10 space-y-6">

                    {/* Disclaimer */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded text-sm">
                        <p className="text-yellow-900">
                            <strong>Disclaimer:</strong> In case of any discrepancy or difference, the English version will take precedence over the translation.
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="space-y-3 text-sm text-gray-700">
                        <p className="leading-relaxed">
                            We value the trust you place in us and recognize the importance of secure transactions and information privacy. This Privacy Policy describes how APK Crackers Private Limited and its affiliates, group companies and related parties (collectively "APK Crackers, we, our, us") collect, use, share or otherwise process your personal data through APK Crackers website www.apkcrackers.com, its mobile application, and m-site (hereinafter referred to as the "Platform").
                        </p>
                        <p className="leading-relaxed">
                            While you can browse sections of the Platform without the need of sharing any information with us, however, please note we do not offer any product or service under this Platform outside India and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information or availing our product/service, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
                        </p>
                    </div>

                    {/* Collection of Your Information */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Collection of Your Information</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="leading-relaxed">
                                When you use our Platform, we collect and store your information which is provided by you from time to time. Once you give us your personal data, you are not anonymous to us. Where possible, we indicate which fields are required and which fields are optional. You always have the option to not provide data by choosing not to use a particular service, product or feature on the Platform.
                            </p>
                            <p className="leading-relaxed">
                                We collect and analyse your personal data relating to your buying behavior, browsing patterns, preferences, and other information that you choose to provide while interacting with our Platform. We use this information to do internal research on our users' demographics, interests, usage trends, and behavior to better understand your needs and provide you with an enhanced user experience, protect and serve our users. Additionally, this information may also be compiled and analyzed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on our Platform or not), which URL you next go to (whether this URL is on our Platform or not), your computer browser information, and your IP address. Such insights enable us to personalise and optimise our products, services, marketing communications, and the checkout process to better align with your preferences. The insights derived from this analysis may be shared with our group companies, affiliates, related companies, business partners, and third-parties who offer services to us or to whom we provide our products or services. These group companies, affiliates, related companies, business partners and third-parties may use such insights for promotions, advertisements and marketing, product development, and other commercial purposes. They may also leverage these insights to personalise your browsing experience and customise various aspects of the user journey such as the checkout flow, payment options, delivery recommendations either on our Platform or their own platforms. Please note that any processing of your personal data by third-parties will be governed by their own privacy policies. APK Crackers does not control, endorse, or assume responsibility for the privacy practices of third parties, and we encourage you to review their privacy policies.
                            </p>
                            <p className="leading-relaxed">
                                We may collect personal data (such as email address, delivery address, name, phone number, credit card/debit card and other payment instrument details) from you when you set up an account or transact with us or participate in any event or contest. While you can browse some sections of our Platform without being a registered member, certain activities (such as placing an order or consuming our online content or services) do require registration. We use your contact information to send you offers based on your previous orders and your interests.
                            </p>
                            <p className="leading-relaxed">
                                If you choose to post messages on our message boards, chat rooms or other message areas or leave feedback on the Platform or the social media handles maintained by us, we will collect that information you provide to us. We retain this information as necessary to resolve disputes, provide customer support, troubleshoot problems or for internal research and analysis as permitted by law.
                            </p>
                            <p className="leading-relaxed">
                                If you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities or postings on the Platform, we may collect such information into a file specific to you.
                            </p>
                        </div>
                    </section>

                    {/* Use of Demographic / Profile Data / Your Information */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Use of Demographic / Profile Data / Your Information</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="leading-relaxed">
                                We use your personal data to take and fulfill orders, deliver products and services, process payments, and communicate with you about orders, products and services, and promotional offers. We use your personal data to assist sellers and business partners in handling and fulfilling orders; enhancing customer experience; resolve disputes; troubleshoot problems; help promote a safe service; collect money; measure consumer interest in our products and services; inform you about online and offline offers, products, services, and updates; customize and enhance your experience; report to regulatory authorities wherever required, detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; and as otherwise described to you at the time of collection of information.
                            </p>
                            <p className="leading-relaxed">
                                With your consent, we may have access to your SMS, instant messages, contacts in your directory, location, camera, photo gallery and device information and we may also request you to provide your PAN, GST Number, Government issued ID cards/number and Know-Your-Customer (KYC) details to: (i) check your eligibility for certain products and services like insurance, credit and payment products; (ii) issue GST invoice for the products and services purchased for your business requirements; (iii) enhance your experience on the Platform and provide you access to the products and services being offered by us, sellers, affiliates, business partners or third-parties who offer services to us or to whom we provide our products or services. You understand that your access to these products/services may be affected in the event consent is not provided to us.
                            </p>
                            <p className="leading-relaxed">
                                In our efforts to continually improve our product and service offerings, we and our affiliates collect and analyze demographic and profile data about our users' activity on our Platform. We identify and use your IP address to help diagnose problems with our server, and to administer our Platform. Your IP address is also used to help identify you and to gather broad demographic information.
                            </p>
                            <p className="leading-relaxed">
                                We will occasionally ask you to participate in optional surveys conducted either by us or through a third-party market research agency. These surveys may ask you for personal data, contact information, date of birth, demographic information (like zip code, age, or income level), attributes such as your interests, household or lifestyle information, your purchasing behavior or history, preferences, and other such information that you may choose to provide. The surveys may involve collection of voice data or video recordings, the participation of which would purely be voluntary in nature. We use this data to tailor your experience at our Platform, providing you with content that we think you might be interested in and to display content according to your preferences.
                            </p>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Cookies</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="leading-relaxed">
                                We use data collection devices such as "cookies" on certain pages of the Platform to help analyze our web page flow, measure promotional effectiveness, and promote trust and safety. "Cookies" are small files placed on your hard drive that assist us in providing our services. Cookies do not contain any of your personal data. We offer certain features that are only available through the use of a "cookie". We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests. Most cookies are "session cookies," meaning that they are automatically deleted from your hard drive at the end of a session. You are always free to decline/delete our cookies if your browser permits, although in that case you may not be able to use certain features on the Platform and you may be required to re-enter your password more frequently during a session. Additionally, you may encounter "cookies" or other similar devices on certain pages of the Platform that are placed by third parties. We do not control the use of cookies by third parties. We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics helps us understand how our customers use the site. You can read more about how Google uses your personal data here: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-500 underline">https://www.google.com/intl/en/policies/privacy/</a>. You can opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-500 underline">https://tools.google.com/dlpage/gaoptout</a>. You can also control the use of cookies at the individual browser level, but if you choose to disable cookies, it may limit your use of certain features or functions on the services.
                            </p>
                        </div>
                    </section>

                    {/* Sharing of Personal Data */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Sharing of Personal Data</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="leading-relaxed">
                                We may share personal data with APK Crackers group companies and affiliates, related companies, including Credit Bureaus and business partners (such as UPI platform), for purposes of providing products and services offered by such APK Crackers group companies and affiliates and related companies. These group companies, affiliates and related parties may share such information with their own affiliates, business partners and other third parties for the purpose of conducting the required checks, namely for the purpose of credit underwriting, providing you their products and services and may market to you as a result of such sharing.
                            </p>
                            <p className="leading-relaxed">
                                Additionally, we may also disclose your personal data to third parties, such as our sellers, business partners. This disclosure may be required for us to provide you access to our products and services; for fulfillment of your orders; for enhancing your experience; for providing feedback on products; to collect payments from you; to comply with our legal obligations; to conduct market research or surveys; to enforce our Terms of Use; to facilitate our marketing and advertising activities; to analyze data; for customer service assistance; to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our product and services. In addition, we may share your personal data with business partners and third-parties who offer services to us or to whom we provide our products or services to enable them to offer, advertise, personalise your browsing experience and customise various aspects of the user journey such as the checkout flow, auto-filling sign-up details to facilitate a faster checkout process, or promote their own products and services to you and this may include, without limitation, conducting marketing campaigns, personalised customer engagement, curated product or service recommendations, and other outreach activities designed to align with your interests and preferences.
                            </p>
                            <p className="leading-relaxed">
                                We may disclose personal data if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose personal data to law enforcement agencies, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to enforce our Terms of Use or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.
                            </p>
                            <p className="leading-relaxed">
                                We and our affiliates will share/sell some or all of your personal data with another business entity should we (or our assets) plan to merge with, or be acquired by that business entity, or reorganization, amalgamation, restructuring of business. Should such a transaction occur, that other business entity (or the new combined entity) will be required to follow this Privacy Policy with respect to your personal data.
                            </p>
                        </div>
                    </section>

                    {/* Links to Other Sites */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Links to Other Sites</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Our Platform may provide links to other websites or applications that may collect personal data about you and you will be governed by their privacy policies. APK Crackers shall not be responsible for the privacy practices or the content of their privacy policies, and we request you to read their privacy policies prior to disclosing any information.
                        </p>
                    </section>

                    {/* Security Precautions */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Security Precautions</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            We maintain reasonable physical, electronic and procedural safeguards to protect your information. Whenever you access your account information, we offer the use of a secure server. Once your information is in our possession, we adhere to our security guidelines to protect it against unauthorized access. However, by using the Platform, the users accept the inherent security implications of data transmission over the internet and the World Wide Web which cannot always be guaranteed as completely secure, and therefore, there would always remain certain inherent risks regarding use of the Platform. Users are responsible for ensuring the protection of login and password records for their account.
                        </p>
                    </section>

                    {/* Choice/Opt-Out */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Choice/Opt-Out</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            We provide all users with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications after setting up an account with us. If you do not wish to receive promotional communications from us, please contact our customer support to unsubscribe/opt-out.
                        </p>
                    </section>

                    {/* Advertisements on Platform */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Advertisements on Platform</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            We use third-party advertising companies to serve ads when you visit our Platform. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide personalized advertisements about goods and services of interest to you. You have an option to opt out from tracking of personalized advertising using the "Opt out of Ads Personalization" settings using your device's settings application. APK Crackers will have no access to your GAID once you select this feature.
                        </p>
                    </section>

                    {/* Children Information */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Children Information</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Use of our Platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. We do not knowingly solicit or collect personal data from children under the age of 18 years. If you have shared any personal data of children under the age of 18 years, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy.
                        </p>
                    </section>

                    {/* Data Retention */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Data Retention</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            We retain your personal data in accordance with applicable laws, for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse, to enable APK Crackers to exercise its legal rights and/or defend against legal claims or if required by law or we may continue to retain your data in anonymised form for analytical and research purposes.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Your Rights</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="leading-relaxed">
                                We take every reasonable step to ensure that your personal data that we process is accurate and, where necessary, kept up to date, and any of your personal data that we process that you inform us is inaccurate (having regard to the purposes for which they are processed) is erased or rectified. You may access, correct, and update your personal data directly through the functionalities provided on the Platform. You may delete certain non-mandatory information by logging into our website and visiting Profile and Settings sections. You can also write to us at the contact information provided below to assist you with these requests.
                            </p>
                            <p className="leading-relaxed">
                                You have an option to withdraw your consent that you have already provided by writing to us at the contact information provided below. Please mention "for withdrawal of consent" in the subject line of your communication. We will verify such requests before acting upon your request. Please note, however, that withdrawal of consent will not be retroactive and will be in accordance with the terms of this Privacy Policy, related Terms of Use and applicable laws. In the event you withdraw consent given to us under this Privacy Policy, such withdrawal may hamper your access to the Platform or restrict provision of our services to you for which we consider that information to be necessary.
                            </p>
                        </div>
                    </section>

                    {/* Your Consent */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Your Consent</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="leading-relaxed">
                                By visiting our Platform or by providing your personal data, you consent to the collection, use, storage, disclosure and otherwise processing of your personal data on the Platform in accordance with this Privacy Policy. If you disclose to us any personal data relating to other people, you represent that you have the authority to do so and to permit us to use the data in accordance with this Privacy Policy.
                            </p>
                            <p className="leading-relaxed">
                                You, while providing your personal data over the Platform or any partner platforms or establishments, consent to us (including our other corporate entities, affiliates, business partners and other third parties) to contact you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy.
                            </p>
                        </div>
                    </section>

                    {/* Changes to Privacy Policy */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Changes to this Privacy Policy</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices. We will alert you to significant changes by posting the date our policy got last updated, placing a notice on our Platform, or by sending you an email when we are required to do so by applicable law.
                        </p>
                    </section>

                    {/* Grievance Officer */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Grievance Officer</h2>
                        <div className="text-sm text-gray-700 space-y-2">
                            <p className="leading-relaxed">
                                In accordance with Information Technology Act 2000 and rules made thereunder, the name and contact details of the Grievance Officer are provided below:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                                <p><strong>Mr. Selvadhanush S</strong></p>
                                <p>Designation: Privacy Officer</p>
                                <p>APK Crackers Private Limited</p>
                                <p>Sivakasi, Tamil Nadu</p>
                                <p>India, 626123</p>
                                <p className="mt-2">Email: <a href="mailto:privacy.grievance@apkcrackers.com" className="text-orange-600 hover:text-orange-500 underline">privacy.grievance@apkcrackers.com</a></p>
                            </div>
                        </div>
                    </section>

                    {/* Customer Support */}
                    <section className="space-y-3">
                        <h2 className="text-base font-bold text-gray-900">Customer Support</h2>
                        <div className="text-sm text-gray-700 space-y-2">
                            <p className="leading-relaxed">
                                If you have a query, concern, or complaint in relation to collection or usage of your personal data under this Privacy Policy please contact us at <a href="mailto:privacy.grievance@apkcrackers.com" className="text-orange-600 hover:text-orange-500 underline">privacy.grievance@apkcrackers.com</a>
                            </p>
                            <p className="leading-relaxed">
                                You can reach our customer support team to address any of your queries or complaints related to product and services by contacting us at <strong>+91 98765 43210</strong> (Monday-Saturday, 9:00 AM - 6:00 PM IST)
                            </p>
                        </div>
                    </section>

                    {/* Footer */}
                    <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200">
                        <p className="font-semibold">Last Updated: December 2024</p>
                        <p className="mt-2">© 2024 APK Crackers Private Limited. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
