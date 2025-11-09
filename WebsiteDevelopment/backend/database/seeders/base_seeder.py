from abc import ABC, abstractmethod
from typing import Set


class BaseSeeder(ABC):
    environments: Set[str] = {"development", "test"}

    def __init__(self, session):
        self._session = session

    @abstractmethod
    def run(self):
        raise NotImplementedError("run method not implemented")
