import { Box, Typography } from "@mui/material";
import NoticeCard from "../components/noticeCard";
import { useEffect, useState } from "react";
import { INoticeType, getNotices } from "../api/notice";

export default function Home() {
  const [notices, setNotices] = useState<INoticeType[] | undefined>();

  useEffect(() => {
    const getAllNotices = async () => {
      try {
        const resp = await getNotices();
        setNotices(resp);
      } catch (error) {
        console.log(error);
      }
    };
    getAllNotices();
  }, []);

  return (
    <>
      <Typography textAlign="center" p={3} variant="h4">
        Notices
      </Typography>
      <Box
        p={3}
        sx={{
          display: "grid",
          listStyle: "none",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: 2,
          justifyContent: "unset",
        }}
      >
        {notices?.map((i, idx) => (
          <NoticeCard data={i} key={idx} />
        ))}
      </Box>
    </>
  );
}
