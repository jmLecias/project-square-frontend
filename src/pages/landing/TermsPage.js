import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsPage = () => {
    const navigate = useNavigate();

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
                    <h1>Terms of Use</h1>
                    <p className="last-updated">Last updated: November 13, 2024</p>

                    <h2>Agreement to Our Legal Terms</h2>
                    <p>
                        We are Security Using AI Remembering Entities, doing business as SQUARE
                        ("Company," "we," "us," "our"), a company registered in the Philippines at
                        Paterno St, Tacloban City, Leyte 6500. We operate the website official-square.site
                        (the "Site"), as well as any other related products and services that refer or link
                        to these legal terms (the "Legal Terms") (collectively, the "Services").
                    </p>
                    <p>
                        We connect to IP Cameras or your device's camera to get your attendance and generate
                        a report of your attendance record. The website also uses the IP Cameras as a security
                        feature for the institution.
                    </p>
                    <p>
                        You can contact us by phone at <a href="tel:+639064787600">+639064787600</a>, email at
                        <a href="mailto:2100892@lnu.edu.ph"> 2100892@lnu.edu.ph</a>, or by mail to Paterno St, Tacloban City, Leyte 6500, Philippines.
                    </p>
                    <p>
                        These Legal Terms constitute a legally binding agreement made between you, whether
                        personally or on behalf of an entity ("you"), and Security Using AI Remembering Entities,
                        concerning your access to and use of the Services. You agree that by accessing the Services,
                        you have read, understood, and agreed to be bound by all of these Legal Terms.
                    </p>
                    <p className="highlight">
                        IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY
                        PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                    </p>
                    <p>
                        We will provide you with prior notice of any scheduled changes to the Services you are
                        using. The modified Legal Terms will become effective upon posting or notifying you by email
                        at <a href="mailto:2100892@lnu.edu.ph">2100892@lnu.edu.ph</a>. By continuing to use the Services after the
                        effective date of any changes, you agree to be bound by the modified terms.
                    </p>
                    <p>
                        The Services are intended for users who are at least 18 years old. Persons under the age of
                        18 are not permitted to use or register for the Services.
                    </p>
                    <p>We recommend that you print a copy of these Legal Terms for your records.</p>

                    <h2>Table of Contents</h2>
                    <ol>
                        <li>Our Services</li>
                        <li>Intellectual Property Rights</li>
                        <li>User Representations</li>
                        <li>User Registration</li>
                        <li>Prohibited Activities</li>
                        <li>User Generated Contributions</li>
                        <li>Contribution License</li>
                        <li>Third-Party Websites and Content</li>
                        <li>Services Management</li>
                        <li>Privacy Policy</li>
                        <li>Term and Termination</li>
                        <li>Modifications and Interruptions</li>
                        <li>Governing Law</li>
                        <li>Dispute Resolution</li>
                        <li>Corrections</li>
                        <li>Disclaimer</li>
                        <li>Limitations of Liability</li>
                        <li>Indemnification</li>
                        <li>User Data</li>
                        <li>Electronic Communications, Transactions, and Signatures</li>
                        <li>Miscellaneous</li>
                        <li>Contact Us</li>
                    </ol>

                    <h3>1. Our Services</h3>
                    <p>
                        The information provided when using the Services is not intended for distribution to or
                        use by any person or entity in any jurisdiction or country where such distribution or use
                        would be contrary to law or regulation or which would subject us to any registration
                        requirement within such jurisdiction or country. Accordingly, those persons who choose to
                        access the Services from other locations do so on their own initiative and are solely
                        responsible for compliance with local laws, if and to the extent local laws are applicable.
                    </p>

                    <h3>2. Intellectual Property Rights</h3>
                    <h3>Our Intellectual Property</h3>
                    <p>
                        We are the owner or the licensee of all intellectual property rights in our Services,
                        including all source code, databases, functionality, software, website designs, audio,
                        video, text, photographs, and graphics in the Services (collectively, the "Content"), as
                        well as the trademarks, service marks, and logos contained therein (the "Marks").
                    </p>
                    <p>
                        Our Content and Marks are protected by copyright and trademark laws (and various other
                        intellectual property rights and unfair competition laws) and treaties around the world.
                        The Content and Marks are provided in or through the Services "AS IS" for your personal,
                        non-commercial use or internal business purpose only.
                    </p>

                    <h3>Your Use of Our Services</h3>
                    <p>
                        Subject to your compliance with these Legal Terms, including the "Prohibited Activities"
                        section below, we grant you a non-exclusive, non-transferable, revocable license to:
                    </p>
                    <ul>
                        <li>Access the Services; and</li>
                        <li>Download or print a copy of any portion of the Content to which you have properly gained access.</li>
                    </ul>
                    <p>
                        Solely for your personal, non-commercial use or internal business purpose.
                    </p>

                    <p>
                        Except as set out in this section or elsewhere in our Legal Terms, no part of the Services
                        and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded,
                        posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed,
                        or otherwise exploited for any commercial purpose whatsoever, without our express prior
                        written permission.
                    </p>

                    <p>
                        If you wish to make any use of the Services, Content, or Marks other than as set out in
                        this section or elsewhere in our Legal Terms, please address your request to:
                        mycompany@email.com. If we ever grant you the permission to post, reproduce, or
                        publicly display any part of our Services or Content, you must identify us as the owners
                        or licensors of the Services, Content, or Marks and ensure that any copyright or
                        proprietary notice appears or is visible on posting, reproducing, or displaying our Content.
                    </p>

                    <p>
                        We reserve all rights not expressly granted to you in and to the Services, Content, and
                        Marks.
                    </p>

                    <p>
                        <strong> Any breach of these Intellectual Property Rights will terminate your right to use our Services immediately.</strong>
                    </p>

                    <h3>Your Submissions</h3>
                    <p>
                        Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.
                    </p>
                    <p>
                        Submissions: By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
                    </p>
                    <p>
                        You are responsible for what you post or upload: By sending us Submissions through any part of the Services, you:
                    </p>
                    <ul>
                        <li>Confirm that you have read and agree with our "PROHIBITED ACTIVITIES" and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
                        <li>To the extent permissible by applicable law, waive any and all moral rights to any such Submission;</li>
                        <li>Warrant that any such Submissions are original to you or that you have the necessary rights and licenses to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and</li>
                        <li>Warrant and represent that your Submissions do not constitute confidential information.</li>
                    </ul>
                    <p>
                        You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party’s intellectual property rights, or (c) applicable law.
                    </p>

                    <h3>3. User Representations</h3>
                    <p>
                        By using the Services, you represent and warrant that:
                    </p>
                    <ul>
                        <li>All registration information you submit will be true, accurate, current, and complete;</li>
                        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
                        <li>You have the legal capacity and you agree to comply with these Legal Terms;</li>
                        <li>You are not a minor in the jurisdiction in which you reside;</li>
                        <li>You will not access the Services through automated or non-human means, whether through a bot, script, or otherwise;</li>
                        <li>You will not use the Services for any illegal or unauthorized purpose; and</li>
                        <li>Your use of the Services will not violate any applicable law or regulation.</li>
                    </ul>
                    <p>
                        If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).
                    </p>

                    <h3>4. User Registration</h3>
                    <p>
                        You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                    </p>


                    <h3>5. Prohibited Activities</h3>
                    <p>
                        You may not access or use the Services for any purpose other than that for which we
                        make the Services available. The Services may not be used in connection with any
                        commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>

                    <p>
                        As a user of the Services, you agree not to:
                    </p>

                    <ul>
                        <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                        <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                        <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
                        <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                        <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                        <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                        <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                        <li>Engage in unauthorized framing of or linking to the Services.</li>
                        <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
                        <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                        <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                        <li>Attempt to impersonate another user or person or use the username of another user.</li>
                        <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").</li>
                        <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                        <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
                        <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
                        <li>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                        <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
                        <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.</li>
                        <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
                        <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                        <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                        <li>Sell or otherwise transfer your profile.</li>
                        <li>Use the Services to advertise or offer to sell goods and services.</li>
                        <li>Use the Service to imitate an individual affiliated or non-affiliated to the company or institution.</li>
                        <li>Use DeepFake or any similar AI technology to take attendance for any individual.</li>
                    </ul>

                    <h3>6. USER GENERATED CONTRIBUTIONS</h3>
                    <p>The Services does not offer users the ability to submit or post content.</p>

                    <h3>7. CONTRIBUTION LICENSE</h3>
                    <p>
                        You and Services agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).
                    </p>
                    <p>
                        By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.
                    </p>

                    <h3>8. THIRD-PARTY WEBSITES AND CONTENT</h3>
                    <p>
                        The Services may contain (or you may be sent via the Site) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us.
                    </p>
                    <p>
                        If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Services or relating to any applications you use or install from the Services.
                    </p>
                    <p>
                        Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party. You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us blameless from any harm caused by your purchase of such products or services. Additionally, you shall hold us blameless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
                    </p>

                    <h3>9. SERVICES MANAGEMENT</h3>
                    <p>We reserve the right, but not the obligation, to:</p>
                    <ul>
                        <li>Monitor the Services for violations of these Legal Terms;</li>
                        <li>Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities;</li>
                        <li>In our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof;</li>
                        <li>In our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems;</li>
                        <li>Otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</li>
                    </ul>

                    <h3>10. PRIVACY POLICY</h3>
                    <p>
                        We care about data privacy and security. Please review our Privacy Policy: <a href="mywebsite.com/privacy">mywebsite.com/privacy</a>.
                    </p>
                    <p>
                        By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in the Philippines and Singapore.
                    </p>
                    <p>
                        If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in the Philippines and Singapore, then through your continued use of the Services, you are transferring your data to the Philippines and Singapore, and you expressly consent to have your data transferred to and processed in the Philippines and Singapore.
                    </p>

                    <h3>11. TERM AND TERMINATION</h3>
                    <p>
                        These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                    </p>
                    <p>
                        If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                    </p>

                    <h3>12. MODIFICATIONS AND INTERRUPTIONS</h3>
                    <p>
                        We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
                    </p>
                    <p>
                        We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
                    </p>

                    <h3>13. GOVERNING LAW</h3>
                    <p>
                        These Legal Terms shall be governed by and defined following the laws of the Philippines. Security Using AI Remembering Entities and yourself irrevocably consent that the courts of the Philippines shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
                    </p>

                    <h3>14. DISPUTE RESOLUTION</h3>
                    <p>
                        You agree to irrevocably submit all disputes related to these Legal Terms or the legal relationship established by these Legal Terms to the jurisdiction of the Philippines courts. Security Using AI Remembering Entities shall also maintain the right to bring proceedings as to the substance of the matter in the courts of the country where you reside or, if these Legal Terms are entered into in the course of your trade or profession, the state of your principal place of business.
                    </p>

                    <h3>15. CORRECTIONS</h3>
                    <p>
                        There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                    </p>

                    <h3>16. DISCLAIMER</h3>
                    <p>
                        THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
                    </p>
                    <p>
                        WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES OR ANY HYPERLINKED WEBSITE OR MOBILE APPLICATION, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY MONITOR ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
                    </p>

                    <h3>17. LIMITATIONS OF LIABILITY</h3>
                    <p>
                        IN NO EVENT SHALL WE OR OUR DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE TO YOU FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                    </p>

                    <h3>18. INDEMNIFICATION</h3>
                    <p>
                        You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) your use of the Services; (3) your violation of these Legal Terms; or (4) your violation of any rights of another party.
                    </p>

                    <h3>19. USER DATA</h3>
                    <p>
                        We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                    </p>

                    <h3>20. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h3>
                    <p>
                        Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email, and on the Services, satisfy any legal requirement that such communication be in writing.
                    </p>

                    <h3>21. MISCELLANEOUS</h3>
                    <p>
                        These Legal Terms and any policies or operating rules posted by us on the Services or in
                        respect to the Services constitute the entire agreement and understanding between you
                        and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall
                        not operate as a waiver of such right or provision. These Legal Terms operate to the fullest
                        extent permissible by law. We may assign any or all of our rights and obligations to others
                        at any time. We shall not be responsible or liable for any loss, damage, delay, or failure
                        to act caused by any cause beyond our reasonable control. If any provision or part of a
                        provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that
                        provision or part of the provision is deemed severable from these Legal Terms and does
                        not affect the validity and enforceability of any remaining provisions. There is no joint
                        venture, partnership, employment or agency relationship created between you and us as
                        a result of these Legal Terms or use of the Services. You agree that these Legal Terms
                        will not be construed against us by virtue of having drafted them. You hereby waive any
                        and all defenses you may have based on the electronic form of these Legal Terms and
                        the lack of signing by the parties hereto to execute these Legal Terms.
                    </p>

                    <h3>22. CONTACT US </h3>
                    <p>
                        In order to resolve a complaint regarding the Services or to receive further information
                        regarding use of the Services, please contact us at:
                    </p>

                    <div><strong>Security Using AI Remembering Entities</strong></div>
                    <div><strong>Paterno St</strong></div>
                    <div><strong>Tacloban City, Leyte 6500</strong></div>
                    <div><strong>Philippines</strong></div>
                    <div><strong>Phone: +639064787600</strong></div>
                    <div><strong>2100892@lnu.edu.ph</strong></div>
                </div>

                <button
                    title="Homepage"
                    className={`main-button mt-3`}
                    style={{ backgroundColor: 'var(--primary-color-dark)' }}
                    onClick={() => navigate("/auth/login")}
                >
                    Back 
                </button>
            </div>
        </div>
    );
};

export default TermsPage;
