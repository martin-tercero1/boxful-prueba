import { Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function AuthHeader({ title, subtitle, showBackButton, onBackClick }: AuthHeaderProps) {
  return (
    <>
      {showBackButton && (
        <div className="flex items-center gap-3 mb-2">
          <button
            type="button"
            onClick={onBackClick}
            aria-label="Volver"
            style={{
              background: 'none',
              border: 'none',
              padding: '4px 8px 4px 0',
              cursor: 'pointer',
              color: '#4e4c4c',
              fontSize: 18,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#2e49ce')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#4e4c4c')}
          >
            <LeftOutlined />
          </button>
          <Title level={2} style={{ color: '#16163d', fontWeight: 700, margin: 0, fontSize: 'clamp(22px, 3vw, 30px)' }}>
            {title}
          </Title>
        </div>
      )}
      <Title level={2} style={{ color: '#16163d', fontWeight: 700, marginBottom: 8, fontSize: 'clamp(24px, 3vw, 32px)' }}>
        {title}
      </Title>
      <Text style={{ color: '#4e4c4c', fontSize: 15, display: 'block', marginBottom: showBackButton ? 32 : 36 }}>
        {subtitle}
      </Text>
    </>
  );
}