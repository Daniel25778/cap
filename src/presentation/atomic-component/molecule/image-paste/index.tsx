// eslint-disable-next-line import/no-unresolved
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { resolverError } from 'main/utils';
import { useRef, useState } from 'react';
import type { ClipboardEvent, FC } from 'react';
import type { MatchTeam } from 'domain/models/match';

const ImagePasteProcessor: FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [matchData, setMatchData] = useState<MatchTeam | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const formatExtractedText = (text: string): MatchTeam => {
    // Exemplo fictício (ajuste conforme sua necessidade)
  };
  const processImage = async (file: File): Promise<void> => {
    setLoading(true);
    try {
      const formData = new FormData();

      console.log('zzzzz');

      formData.append('image', file);

      const response = await fetch('http://localhost:8000/extract-text', {
        body: formData,
        method: 'POST'
      });

      if (!response.ok) throw new Error('Erro ao processar a imagem');

      const data = await response.json();

      console.log('Texto extraído:', data.text);

      setMatchData(formatExtractedText(data.text));
    } catch (error) {
      resolverError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>): void => {
    const { items } = event.clipboardData;

    for (const item of items)
      if (item.type.startsWith('image')) {
        const file = item.getAsFile();

        if (file) {
          const reader = new FileReader();

          reader.onload = (e): void => {
            setImage(e.target?.result as string);
            processImage(file);
          };
          reader.readAsDataURL(file);
        }
      }
  };

  return (
    <div>
      {image ? (
        <div className={'relative group w-full h-[300px]'}>
          <img alt={'Imagem'} className={'w-full h-full object-contain '} src={image} />

          <Button
            className={
              'absolute bg-black bg-opacity-50  text-white opacity-0 group-hover:opacity-100  top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '
            }
            onClick={() => setImage(null)}
          >
            <Delete />
          </Button>
        </div>
      ) : (
        <div
          className={
            'flex items-center justify-center w-full h-[300px] border-2 border-dashed border-gray-300'
          }
          onPaste={handlePaste}
          ref={inputRef}
        >
          <p className={'text-white text-center text-base font-semibold'}>
            Cole (Ctrl + V) uma imagem aqui
          </p>
        </div>
      )}

      {loading ? (
        <p className={'text-white text-center text-base '}>Processando imagem...</p>
      ) : null}
    </div>
  );
};

export default ImagePasteProcessor;
