import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import home from "../assets/home.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/hook";
import { INoticeType } from "api/notice";

export default function NoticeCard({ data }: { data: INoticeType }) {
  const navigate = useNavigate();
  const user = useUser();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/publishNotice/${data?.id}`)}>
        <CardMedia component="img" height="140" image={home} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" height="60px">
            Description : {data?.desc}
          </Typography>
          <Typography variant="body2" color="text.secondary" height="60px">
            Address : {data?.address}
          </Typography>
          <Typography variant="body2" color="text.secondary" height="20px">
            Phone : {data?.phone}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", height: "50px" }}>
        <Button size="small" color="secondary" onClick={() => navigate(`/publishNotice/${data?.id}`)}>
          visit
        </Button>
        {Number(data?.userId) === Number(user?.id) && (
          <Button size="small" color="secondary">
            my notice
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
