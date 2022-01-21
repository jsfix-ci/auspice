import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { Aminoacid, AminoacidDeletion, AminoacidSubstitution, Gene } from '../../../types/types'; // eslint-disable-line

/**
 * Most code taken from nextclade circa commit a8efc6924e2ea61d359dc029e9802b0a9b722611
 */

// Borrowed from http://ugene.net/forum/YaBB.pl?num=1337064665
export const AMINOACID_COLORS: Record<string, string> = {
  A: '#e5e575',
  V: '#e5e57c',
  L: '#e5e550',
  I: '#e5e514',
  B: '#e54c4c',
  C: '#cee599',
  D: '#e5774e',
  E: '#e59c6c',
  F: '#e2e54d',
  G: '#e57474',
  H: '#9ddde5',
  K: '#b4a2e5',
  M: '#b7e525',
  N: '#e57875',
  P: '#b6b5e5',
  Q: '#e5aacd',
  R: '#878fe5',
  S: '#e583d8',
  T: '#e5b3cc',
  W: '#4aa7e5',
  X: '#aaaaaa',
  Y: '#57cfe5',
  Z: '#777777',
  '*': '#777777',
  '-': '#444444'
};

const AMINOACID_GAP = ('-' as const) as Aminoacid;

const getTextColor = () => {
  return "#aaa";
};

function getAminoacidColor(aa: Aminoacid): string {
  return get(AMINOACID_COLORS, aa) ?? AMINOACID_COLORS['-']
}

export const MutationBadgeBox = styled.span`
  display: inline-block;
  font-size: 0.75rem;
`;

export const MutationWrapper = styled.span`
  border-radius: 2px;
  /* box-shadow: ${(props) => props.theme.shadows.light};
  font-family: ${(props) => props.theme.font.monospace}; */
  & > span:first-child {
    padding-left: 4px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  & > span:last-child {
    padding-right: 4px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

export const GeneText = styled.span<{ $background?: string; $color?: string }>`
  padding: 1px 2px;
  background-color: ${(props) => props.$background};
  /* color: ${(props) => props.$color ?? props.theme.gray100}; */
  color: "#aaa";
  font-weight: 700;
`;

export const ColoredText = styled.span<{ $background?: string; $color?: string }>`
  padding: 1px 2px;
  background-color: ${(props) => props.$background};
  /* color: ${(props) => props.$color ?? props.theme.gray100}; */
  color: "#aaa";
`;

export const PositionText = styled.span`
  padding: 1px 2px;
  /* background-color: ${(props) => props.theme.gray300};
  color: ${(props) => props.theme.gray800}; */
  color: "#aaa";
`;

export const VersionText = styled.span`
  padding: 1px 2px;
  /* background-color: ${(props) => props.theme.gray400};
  color: ${(props) => props.theme.gray800}; */
  color: "#aaa";
`;

export interface MutationBadgeProps {
  mutation: AminoacidSubstitution | AminoacidDeletion
  geneMap: Gene[]
}

export function AminoacidMutationBadge({ mutation, geneMap }: MutationBadgeProps) {

  const { gene: geneName, refAA, codon } = mutation;
  const queryAA = get(mutation, 'queryAA', AMINOACID_GAP) as Aminoacid;

  const gene = geneMap.find((g) => g.geneName === geneName);
  const geneBg = gene?.color ?? '#999';
  const refBg = getAminoacidColor(refAA);
  const refFg = getTextColor();
  const queryBg = getAminoacidColor(queryAA);
  const queryFg = getTextColor();
  const codonOneBased = codon + 1;

  return (
    <MutationBadgeBox>
      <MutationWrapper>
        <GeneText $background={geneBg}>
          {geneName}
          <span>{':'}</span>
        </GeneText>
        <ColoredText $background={refBg} $color={refFg}>
          {refAA}
        </ColoredText>
        <PositionText>{codonOneBased}</PositionText>
        <ColoredText $background={queryBg} $color={queryFg}>
          {queryAA}
        </ColoredText>
      </MutationWrapper>
    </MutationBadgeBox>
  );
}
