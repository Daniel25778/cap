import { BodyCell } from 'presentation/atomic-component/atom';
import { TableBody, TableRow } from '@mui/material';
import { ThumbDownAlt, ThumbUp } from '@mui/icons-material';
import type { FC } from 'react';
import type { PlayerTeam } from 'domain/models/match';

interface PlayerActivedTableBodyProps {
  playerTeam: PlayerTeam[];
}

export const PlayerActivedTableBody: FC<PlayerActivedTableBodyProps> = ({ playerTeam }) => {
  return (
    <TableBody className={'relative'}>
      {playerTeam?.map((item) => (
        <TableRow key={item.id} className={'cursor-pointer'} hover>
          <BodyCell className={'font-medium line-clamp-2'} title={item.player.name} />
          <BodyCell className={'font-medium line-clamp-2'} title={item.player.nickname} />

          <BodyCell
            align={'left'}
            title={
              item.player.isMember ? (
                <ThumbUp className={'text-[#4eff37a8]'} />
              ) : (
                <ThumbDownAlt className={'text-[#ff0404e0]'} />
              )
            }
          />

          <BodyCell
            align={'left'}
            title={
              item.player.isOnGuild ? (
                <ThumbUp className={'text-[#4eff37a8]'} />
              ) : (
                <ThumbDownAlt className={'text-[#ff0404e0]'} />
              )
            }
          />

          <BodyCell
            align={'left'}
            title={item.player.instagram ? item.player.instagram : 'Não possui'}
          />

          <BodyCell className={'font-medium line-clamp-2'} title={item.player.totalKills} />
        </TableRow>
      ))}
    </TableBody>
  );
};
