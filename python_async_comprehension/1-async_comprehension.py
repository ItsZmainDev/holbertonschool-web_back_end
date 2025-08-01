#!/usr/bin/env python3
"""Module for an asynchronous"""

from typing import List

async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """Collect random floats from async generator using async comprehension"""
    return [x async for x in async_generator()]
