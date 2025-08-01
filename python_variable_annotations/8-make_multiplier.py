#!/usr/bin/env python3
"""Module for creating a multiplier function"""

from typing import Callable

def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Creates a multiplier function that multiplies a float by a given multiplier"""
    return lambda x: x * multiplier
