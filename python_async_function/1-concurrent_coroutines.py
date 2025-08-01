#!/usr/bin/env python3
"""Module to define a coroutine that spawns multiple wait_random calls"""

import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Spawn n coroutines that wait for random delay and return their delays"""
    tasks = [
        asyncio.create_task(wait_random(max_delay))
        for _ in range(n)
    ]
    delays: List[float] = []
    for completed in asyncio.as_completed(tasks):
        delays.append(await completed)
    return delays
