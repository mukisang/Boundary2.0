import { Point } from 'geojson';
import { UserResDTO } from 'src/user/dto/userRes.dto';

export class RoomDTO {
  roomId: string;
  title: string;
  location: Point;
  generator: UserResDTO;
}
