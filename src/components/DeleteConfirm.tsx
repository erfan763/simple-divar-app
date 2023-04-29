import { useState } from "react";
import { toast } from "react-toastify";

import Confirm from "./Dialogs/Confirm";
import { delete_ } from "../api";

export default function DeleteConfirm({
  url,
  open,
  data,
  onClose,
  onDone,
}: {
  url: string;
  open: boolean;
  data?: any;
  onDone?: () => void;
  onClose: () => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await delete_(url, {}, data);
      toast.success("Deleted Successfully");
      onDone && onDone();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return <Confirm open={open} onClose={onClose} onConfirm={handleDelete} loading={deleting} />;
}
