import React from "react";
import { Helmet } from "react-helmet-async";
import ObfuscatedEmail from "@/components/ObfuscatedEmail/ObfuscatedEmail";
import styles from "./Privacy.module.css";

const Privacy: React.FC = () => (
  <>
    <Helmet>
      <title>Privacy Policy - Repigo</title>
      <meta
        name="description"
        content="Read Repigo's privacy policy and learn how we handle your personal data."
      />
    </Helmet>
    <main className={styles.privacy}>
      <h1>Privacy Policy</h1>
      <p>
        This privacy policy has been written in order to show how Repigo uses
        your personal data. If you have any questions on how your data is used,
        feel free to contact us at <ObfuscatedEmail />.
      </p>
      <p>
        By installing Repigo or using our services you agree for Repigo to
        process personal data on your behalf according to the policy listed in
        this document.
      </p>
      <h2>What personal data do we collect?</h2>
      <p>
        When you register a Repigo account we collect personal data from you
        such as your email address and gender information. When continuing to
        use the app you upload personal data, such as gym workouts data to your
        account. We collect gender information to tailor workout recommendations
        and provide more personalized fitness content.
      </p>
      <p>
        As we want to improve our services, we may collect additional personal
        data in the future. If that happens, we will make sure to notify you
        about our privacy policy updates.
      </p>
      <h2>How we use your personal data</h2>
      <p>
        Your privacy is important! Thus we only use your personal data in
        accordance with this privacy policy. Your personal data belongs to you
        and will not be shared with third parties, without your explicit
        permission to do so.
      </p>
      <p>
        Other information about app usage, crash logs etc may be shared with our
        partners in order for us to be able to improve your app experience.
      </p>
      <h2>Marketing</h2>
      <p>
        Repigo may use your email to send you updates and offers on the Repigo
        service. You may opt out from marketing at any time by unsubscribing.
      </p>
      <h2>Data processors</h2>
      <p>
        Repigo will never transfer data to third parties to use other than on
        behalf of Repigo. Personal data may only be shared with third parties
        that process data on Repigo's behalf, such as data storage,
        authentication providers, crash reporting tools and customer messaging
        services. Third parties are not allowed to use your data in any other
        way than to provide services for Repigo unless you have given your
        explicit consent to allow them to do so.
      </p>
      <h2>Security</h2>
      <p>
        We use industry standard mechanisms for authentication to prevent
        unauthorized access. Please make sure to use a strong password for your
        selected authentication method.
      </p>
      <h2>Data removal</h2>
      <p>
        If you decide you do not want to use Repigo anymore you may delete your
        account from within your app or by sending us an email at{" "}
        <ObfuscatedEmail />. Deleting your account will remove your account info
        and the associated data.
      </p>
      <h2>Data Portability</h2>
      <p>
        You have the right to receive your personal data which you have provided
        to Repigo in accordance with relevant personal data regulation, provided
        that such request does not adversely affect the rights and freedoms of
        others. Data is made available upon request.
      </p>
      <h2>Contact us</h2>
      <p>
        If you have any questions, feel free to contact us at{" "}
        <ObfuscatedEmail />.
      </p>
      <h2>Consent</h2>
      <p>
        By agreeing to these terms and conditions you are giving us permission
        to process your data for the purposes specified. Any other purposes
        would require your explicit consent.
      </p>
    </main>
  </>
);

export default Privacy;
