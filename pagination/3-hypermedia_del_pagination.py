#!/usr/bin/env python3
"""Module for a deletion-resilient hypermedia pagination server class"""

import csv
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database"""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        self.__dataset: List[List] = None
        self.__indexed_dataset: Dict[int, List] = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Returns a dictionary of the dataset indexed by row number"""
        if self.__indexed_dataset is None:
            data = self.dataset()

            self.__indexed_dataset = {i: data[i] for i in range(len(data))}
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None,
                        page_size: int = 10) -> Dict[str, Any]:
        """Return a deletion-resilient page starting from `index`"""
        assert isinstance(index, int) and index >= 0
        assert isinstance(page_size, int) and page_size > 0

        idx = self.indexed_dataset()

        max_key = max(idx.keys()) if idx else -1

        assert index <= max_key

        data: List[List] = []
        cursor = index

        while len(data) < page_size and cursor <= max_key:
            if cursor in idx:
                data.append(idx[cursor])
            cursor += 1

        next_index = cursor
        return {
            "index": index,
            "data": data,
            "page_size": len(data),
            "next_index": next_index,
        }
