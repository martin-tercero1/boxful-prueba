import { Modal, Button } from 'antd';
import Image from 'next/image';

interface OrderSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateAnother: () => void;
  onGoHome: () => void;
}

export default function OrderSuccessModal({
  visible,
  onClose,
  onCreateAnother,
  onGoHome,
}: OrderSuccessModalProps) {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={498}
      centered
      closable={true}
      closeIcon={
        <span className="text-[#161734] text-xl font-light">&times;</span>
      }
    >
      <div className="text-center py-6">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#effdf4' }}
          >
            <Image
              src="/images/check.svg"
              alt="Success checkmark"
              width={56}
              height={56}
            />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-[22px] text-[#161734] mb-2">
          Orden <span className="font-bold">enviada</span>
        </h3>
        
        {/* Description */}
        <p className="text-[#636060] text-base mb-8">
          La orden ha sido creada y enviada, puedes
          <br />
          ver el estado en tu historial de envíos.
        </p>

        {/* Action buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onGoHome}
            style={{
              height: '52px',
              borderRadius: '8px',
              borderColor: '#e1e9e8',
              color: '#161734',
              minWidth: '160px',
              fontSize: '16px',
              fontWeight: 500
            }}
          >
            Ir a inicio
          </Button>
          
          <Button
            type="primary"
            onClick={onCreateAnother}
            style={{
              height: '52px',
              borderRadius: '8px',
              backgroundColor: '#2e49ce',
              borderColor: '#2e49ce',
              minWidth: '160px',
              fontSize: '16px',
              fontWeight: 500
            }}
          >
            Crear otra
          </Button>
        </div>
      </div>
    </Modal>
  );
}