#!/usr/bin/env python3
"""Module to measure the runtime of an asynchronous comprehension"""

from typing import Final
import asyncio
import time

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """Measure the total runtime of four calls to async_comprehension"""
    start: Final[float] = time.perf_counter()
    await asyncio.gather(*(async_comprehension() for _ in range(4)))
    end: Final[float] = time.perf_counter()
    return end - start
