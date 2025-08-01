#!/usr/bin/env python3
"""Module for an asynchronous comprehension that collects floats from an async generator"""

from typing import List

async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """Collect 10 random floats from an async generator using async comprehension"""
    return [x async for x in async_generator()]
