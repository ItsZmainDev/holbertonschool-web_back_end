#!/usr/bin/env python3
"""Module for an asynchronous generator that yields random floats"""

from typing import AsyncGenerator
import asyncio
import random


async def async_generator() -> AsyncGenerator[float, None]:
    """Yield a random float ten times, pausing 1 second each time"""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0.0, 10.0)
