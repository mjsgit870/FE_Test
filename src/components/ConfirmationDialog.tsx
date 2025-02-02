import { Button, Group, Modal } from "@mantine/core";

interface ConfirmationDialogProps {
  opened: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title: string;
  description: string;
  btnText?: string;
}

export default function ConfirmationDialog({
  opened,
  onClose = () => {},
  onSubmit,
  title = "Title",
  description,
  btnText = "Yes",
}: ConfirmationDialogProps) {
  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      {description}

      <Group mt="lg" justify="flex-end">
        <Button onClick={onClose} variant="default">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="red">
          {btnText}
        </Button>
      </Group>
    </Modal>
  );
}
