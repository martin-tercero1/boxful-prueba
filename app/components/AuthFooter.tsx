import Link from "next/link";
import { Typography } from "antd";

const { Text } = Typography;

interface AuthFooterProps {
  linkText: string;
  linkHref: string;
  prefixText: string;
}

export function AuthFooter({ linkText, linkHref, prefixText }: AuthFooterProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Text style={{ color: '#838282', fontSize: 14 }}>
        {prefixText}{' '}
        <Link
          href={linkHref}
          style={{
            color: '#050817',
            fontWeight: 700,
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#2e49ce')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#050817')}
        >
          {linkText}
        </Link>
      </Text>
    </div>
  );
}