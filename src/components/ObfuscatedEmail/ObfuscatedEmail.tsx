import React from "react";

/**
 * Scrapers be gone!
 */
const ObfuscatedEmail: React.FC = () => {
  const local = "support";
  const domain = "repigo.se";
  const email = `${local}@${domain}`;
  return <a href={`mailto:${email}`}>{email}</a>;
};

export default ObfuscatedEmail;
