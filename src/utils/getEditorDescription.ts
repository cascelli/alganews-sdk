import formatDistance from "date-fns/formatDistance";

import ptBR from "date-fns/locale/pt-BR";

export default function getEditorDescription(editorCreationDate: Date) {
  const distance = formatDistance(editorCreationDate, new Date(), {
    locale: ptBR,
  });

  return `Editor a ${distance}`;
}
