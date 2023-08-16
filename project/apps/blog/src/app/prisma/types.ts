import { Prisma } from '.prisma/client';

type Dict = { postId: number; [k: string]: any };

type WhereDict = { postId?: number | { in?: number[] }; [k: string]: any };

type IncludeDict = {
  post?: boolean;
};

type DictWithPostId = {
  id?: number;
  postId?: number;
  [k: string]: any;
};

type SelectWithId = {
  id?: boolean;
  postId?: boolean;
  [k: string]: any;
};

export type AbstractPostDelegate = {
  findMany: (arg: {
    include?: (Dict & { post?: boolean }) | null;
    where?: WhereDict;
    orderBy?: Prisma.Enumerable<any>;
    cursor?: Dict;
    take?: number;
    skip?: number;
    distinct?: Prisma.Enumerable<any>;
  }) => any;

  findFirst: (arg: {
    select?: SelectWithId | null;
    include?: (Dict & { post?: boolean }) | null;
    where?: Dict;
    orderBy?: Prisma.Enumerable<any>;
    cursor?: Dict;
    take?: number;
    skip?: number;
    distinct?: Prisma.Enumerable<any>;
  }) => any;

  create: (arg: {
    select?: SelectWithId | null;
    include?: (Dict & { post?: boolean }) | null;
    data: any;
  }) => any;

  update: (arg: {
    select?: SelectWithId | null;
    include?: (Dict & { post?: boolean }) | null;
    data: any;
    where: Dict;
  }) => any;

  delete: (arg: {
    select?: SelectWithId | null;
    include?: (Dict & { post?: boolean }) | null;
    where: Dict;
  }) => any;

  [k: string]: any;
};
