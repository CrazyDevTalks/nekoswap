import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("About"),
    items: [
      {
        label: t("Contact"),
        href: "https://nekoprotocol.gitbook.io/nekoswap/contact-us/customer-support",
        // isHighlighted: true,
      },
      {
        label: t("Brand"),
        href: "",
      },
      {
        label: t("Blog"),
        href: "",
      },
      {
        label: t("Community"),
        href: "https://nekoprotocol.gitbook.io/nekoswap/contact-us/social-media-and-links",
      },
      {
        label: t("Litepaper"),
        href: "https://litepaper.nekoswap/",
      },
    ],
  },
  {
    label: t("Help"),
    items: [
      {
        label: t("Customer Support"),
        href: "https://nekoprotocol.gitbook.io/nekoswap/contact-us/customer-support",
      },
      {
        label: t("FAQ"),
        href: "https://nekoprotocol.gitbook.io/nekoswap/nekoswap-intro/help/faq",
      },
      {
        label: t("Troubleshooting"),
        href: "https://nekoprotocol.gitbook.io/nekoswap/nekoswap-intro/help/troubleshooting",
      },
      {
        label: t("Guides"),
        href: "https://docs.pancakeswap.finance/get-started",
      },
    ],
  },
  {
    label: t("Developers"),
    items: [
      {
        label: "Github",
        href: "https://github.com",
      },
      {
        label: t("Documentation"),
        href: "https://nekoprotocol.gitbook.io/nekoswap",
      },
      {
        label: t("Bug Bounty"),
        href: "https://nekoprotocol.gitbook.io/nekoswap/contribute/bug-bounty",
      },
      {
        label: t("Careers"),
        href: "https://nekoprotocol.gitbook.io/nekoswap/contribute/we-are-hiring",
      },
      {
        label: t("Partnerships"),
        href: "https://nekoprotocol.gitbook.io/nekoswap/contact-us/colalboration-and-partnerships",
      },
    ],
  },
];
