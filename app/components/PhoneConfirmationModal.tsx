import { Modal, Button } from 'antd';
import Image from 'next/image';

interface PhoneConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  phoneNumber: string;
  loading?: boolean;
}

export default function PhoneConfirmationModal({
  visible,
  onCancel,
  onConfirm,
  phoneNumber,
  loading = false,
}: PhoneConfirmationModalProps) {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={498}
      centered
      className="rounded-lg"
    >
      <div className="text-center h-full">

        {/* Warning icon and title */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#FFF6E8' }}
          >
            <Image
              src="/images/warning.svg"
              alt="Warning"
              width={56}
              height={56}
            />
          </div>
        </div>
        
        <h3 className="text-[20px] text-[#161734] mb-2">
          Confirmar número <span className="font-bold">de teléfono</span>
        </h3>
        
        <p className="text-[#636060] text-sm mb-6">
          Está seguro de que desea continuar con el número <span className="font-bold">{phoneNumber}?</span>
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end">
          <Button
            onClick={onCancel}
            style={{
              height: '48px',
              borderRadius: '6px',
              borderColor: '#e1e9e8',
              color: '#161734',
              minWidth: '120px'
            }}
          >
            Cancelar
          </Button>
          
          <Button
            type="primary"
            onClick={onConfirm}
            loading={loading}
            style={{
              height: '48px',
              borderRadius: '6px',
              backgroundColor: '#2e49ce',
              borderColor: '#2e49ce',
              minWidth: '120px'
            }}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
