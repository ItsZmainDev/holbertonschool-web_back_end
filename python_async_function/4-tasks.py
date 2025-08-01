#!/usr/bin/env python3
"""Module to define a coroutine that spawns multiple task_wait_random calls"""

import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """Spawn n tasks that wait for a random delay and return their delays"""
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    delays: List[float] = []
    for completed in asyncio.as_completed(tasks):
        delays.append(await completed)
    return delays
