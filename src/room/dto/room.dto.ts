import { Point } from 'geojson';
import { UserResDTO } from 'src/user/dto/userRes.dto';

export class RoomDTO {
  id: string;
  title: string;
  location: Point;
  generator: UserResDTO;
}
