#!/usr/bin/env python3
"""Module for creating a key-value pair with the value squared"""

from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Creates a key-value pair with the key and the square of the value"""
    return (k, float(v ** 2))
