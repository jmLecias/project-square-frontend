import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../hooks/useSidebar';

const PrivacyPolicyPage = () => {
    const navigate = useNavigate();
    const { isNarrow } = useSidebar();

    const SquareLogo = () => {
        return (
            <div className="logo-div">
                <img
                    src="/official-square2.png"
                    alt="official square logo"
                />
            </div>
        );
    };

    return (
        <div className="main-container terms-page">
            <div className="content-area">
                <div className="header d-flex align-items-center">
                    <SquareLogo />
                    <div className="logo-text ms-2">SQUARE</div>
                </div>

                <div className="terms-content custom-scrollbar light">
                    <h1>Privacy Policy</h1>
                    <p className="s1">Last updated: November 13, 2024</p>
                    <p>
                        This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                    </p>
                    <p>
                        We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                    </p>
                    <h1>Interpretation and Definitions</h1>
                    <p>
                        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    </p>
                    <h1>Definitions</h1>
                    <p>For the purposes of this Privacy Policy:</p>
                    <ul id="l1">
                        <li>
                            <p>
                                Account <span>means a unique account created for You to access our Service or parts of our Service.</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Affiliate <span>means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Company <span>(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to SQUARE.</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Cookies <span>are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Country <span>refers to: Philippines</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Device <span>means any device that can access the Service such as a computer, a cellphone or a digital tablet.</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Personal Data <span>is any information that relates to an identified or identifiable individual.</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Service <span>refers to the Website.</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Service Provider <span>means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</span>
                            </p>
                        </li>
                        <p>
                            Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
                        </p>
                        <li>
                            <p>
                                Usage Data <span>refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Website <a href="https://official-square.site/" target="_blank" rel="noopener noreferrer">refers to SQUARE, accessible from official-square.site</a>
                            </p>
                        </li>
                        <li>
                            <p>
                                You <span>means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</span>
                            </p>
                        </li>
                    </ul>

                    <h1 className="section-title">Collecting and Using Your Personal Data Types of Data Collected</h1>
                    <h1 className="subsection-title">Personal Data</h1>
                    <p className="section-content">
                        While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                    </p>
                    <ul className="data-list">
                        <li>Email address</li>
                        <li>First name and last name</li>
                        <li>Face Images</li>
                        <li>Usage Data</li>
                    </ul>

                    <h1 className="subsection-title">Usage Data</h1>
                    <p className="section-content">
                        Usage Data is collected automatically when using the Service.
                    </p>
                    <p className="section-content">
                        Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                    </p>
                    <p className="section-content">
                        When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                    </p>
                    <p className="section-content">
                        We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
                    </p>

                    <h1 className="subsection-title">Tracking Technologies and Cookies</h1>
                    <p className="section-content">
                        We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:
                    </p>
                    <h1 className="cookie-title">Cookies or Browser Cookies</h1>
                    <p className="cookie-info">
                        A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
                    </p>
                    <p className="cookie-explanation">
                        Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. You can learn more about cookies on <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies" target="_blank" rel="noopener noreferrer">TermsFeed website</a> article.
                    </p>

                    <p className="section-content">
                        We use both Session and Persistent Cookies for the purposes set out below:
                    </p>
                    <h1 className="cookie-type">Necessary / Essential Cookies</h1>
                    <p className="cookie-details">
                        Type: Session Cookies<br />
                        Administered by: Us
                    </p>
                    <p className="cookie-purpose">
                        Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                    </p>

                    <h1 className="cookie-type">Cookies Policy / Notice Acceptance Cookies</h1>
                    <p className="cookie-details">
                        Type: Persistent Cookies<br />
                        Administered by: Us
                    </p>
                    <p className="cookie-purpose">
                        Purpose: These Cookies identify if users have accepted the use of cookies on the Website.
                    </p>

                    <h1 className="cookie-type">Functionality Cookies</h1>
                    <p className="cookie-details">
                        Type: Persistent Cookies<br />
                        Administered by: Us
                    </p>
                    <p className="cookie-purpose">
                        Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                    </p>
                    <p className="section-content">
                        For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.
                    </p>

                    <h1 className="heading">Use of Your Personal Data</h1>
                    <p className="paragraph">The Company may use Personal Data for the following purposes:</p>
                    <ul>
                        <li>
                            <p className="subheading">To provide and maintain our Service, including to monitor the usage of our Service.</p>
                        </li>
                        <li>
                            <p className="subheading">To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
                        </li>
                        <li>
                            <p className="subheading">For the performance of a contract: the development, compliance, and undertaking of the purchase contract for the products, items, or services You have purchased or of any other contract with Us through the Service.</p>
                        </li>
                        <li>
                            <p className="subheading">To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application’s push notifications regarding updates or informative communications related to the functionalities, products, or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
                        </li>
                        <li>
                            <p className="subheading">To manage Your requests: To attend and manage Your requests to Us.</p>
                        </li>
                        <li>
                            <p className="subheading">For other purposes: We may use Your information for other purposes, such as data analysis and report generation.</p>
                        </li>
                    </ul>
                    <p className="paragraph">We may share Your personal information in the following situations:</p>
                    <ul>
                        <li>
                            <p className="subheading">With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</p>
                        </li>
                        <li>
                            <p className="subheading">With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.</p>
                        </li>
                        <li>
                            <p className="subheading">With Your consent: We may disclose Your personal information for any other purpose with Your consent.</p>
                        </li>
                    </ul>

                    <h1 className="heading">Retention of Your Personal Data</h1>
                    <p className="paragraph">The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
                    <p className="paragraph">The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>

                    <h1 className="heading">Transfer of Your Personal Data</h1>
                    <p className="paragraph">Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
                    <p className="paragraph">Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
                    <p className="paragraph">The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>

                    <h1 className="heading">Delete Your Personal Data</h1>
                    <p className="paragraph">You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
                    <p className="paragraph">Our Service may give You the ability to delete certain information about You from within the Service.</p>
                    <p className="paragraph">You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
                    <p className="paragraph">Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>

                    <h1 className="heading">Disclosure of Your Personal Data Business Transactions</h1>
                    <p className="paragraph">If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>

                    <h1 className="heading">Law enforcement</h1>
                    <p className="paragraph">Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>

                    <h1 className="heading">Other legal requirements</h1>
                    <p className="paragraph">The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>

                    <ul>
                        <li><p className="list-item">Comply with a legal obligation</p></li>
                        <li><p className="list-item">Protect and defend the rights or property of the Company</p></li>
                        <li><p className="list-item">Prevent or investigate possible wrongdoing in connection with the Service</p></li>
                        <li><p className="list-item">Protect the personal safety of Users of the Service or the public</p></li>
                        <li><p className="list-item">Protect against legal liability</p></li>
                    </ul>
                    <h1 className="heading">Security of Your Personal Data</h1>
                    <p className="paragraph">The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
                    <h1 className="heading">Children's Privacy</h1>
                    <p className="paragraph">Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
                    <p className="paragraph">If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
                    <h1 className="heading">Links to Other Websites</h1>
                    <p className="paragraph">Our Service may contain links to other websites that are not operated by Us. If You click on a third-party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
                    <p className="paragraph">We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.</p>
                    <h1 className="heading">Changes to this Privacy Policy</h1>
                    <p className="paragraph">We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
                    <p className="paragraph">We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.</p>
                    <p className="paragraph">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
                    <h1 className="heading">Contact Us</h1>
                    <p className="paragraph">If you have any questions about this Privacy Policy, You can contact us:</p>
                    <ul>
                        <li><p className="list-item">By email: support@example.com</p></li>
                        <li><p className="list-item">By visiting this page on our website: example.com/contact</p></li>
                        <li><p className="list-item">By phone number: (123) 456-7890</p></li>
                        <li><p className="list-item">By mail: 123 Privacy St., City, Country</p></li>
                    </ul>

                </div>

                <button
                    title="Homepage"
                    className={`main-button mt-3 ${isNarrow ? 'small' : ''}`}
                    style={{ backgroundColor: 'var(--primary-color-dark)' }}
                    onClick={() => navigate("/auth/login")}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
