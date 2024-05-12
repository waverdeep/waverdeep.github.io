---
title: 우리가 pydantic을 사용해야 하는 이유
date: 2024-05-12 00:00:00 +0900
categories: [python, tips]
tags: [python, pydantic] # TAG names should always be lowercase
description: pydantic을 사용해야 하는 이유에 대해 설명합니다.
comments: true
---

## Pydantic 사용 이유

Pydantic은 파이썬에서 데이터 검증 및 설정 관리를 위해 널리 사용되는 라이브러리입니다. 데이터의 유효성 검사 및 설정을 간편하고 체계적으로 관리할 수 있도록 돕기 때문에 Pydantic을 사용하는 것이 유용합니다. 다음은 Pydantic을 사용해야 하는 주요 이유입니다.

1. **타입 검증**: Pydantic은 Python의 타입 힌트를 사용하여 데이터를 자동으로 검증합니다. 개발 중 데이터 타입 관련 버그를 예방할 수 있습니다.
2. **데이터 파싱 및 변환**: 입력 데이터를 적절한 타입으로 자동 변환합니다. 예를 들어, JSON 문자열을 Python 객체로 변환하는 과정이 매우 편리합니다.
3. **간편한 설정 관리**: 환경 변수나 설정 파일을 통해 애플리케이션 설정을 쉽게 관리할 수 있습니다.
4. **오류 관리**: 유효성 검사 오류 시 명확하고 이해하기 쉬운 오류 메시지를 제공합니다.

## Pydantic 기본 사용법

Pydantic 사용을 위해서는 먼저 모델을 클래스로 정의해야 합니다. 모델은 `BaseModel`을 상속받으며, 각 필드는 타입 힌트로 정의됩니다.

### 설치

Pydantic은 pip를 통해 설치할 수 있습니다:

```bash
pip install pydantic
```

### 예시 코드

다음은 간단한 사용자 모델을 정의하고, 사용자 입력 데이터를 검증하는 Pydantic 사용 예시입니다.

```python
from pydantic import BaseModel, ValidationError, validator

class User(BaseModel):
    name: str
    age: int
    email: str

    # 필드 검증을 위한 커스텀 검증기 추가
    @validator('age')
    def check_age(cls, value):
        if value < 18:
            raise ValueError('Age must be at least 18')
        return value

# 사용자 데이터 생성 및 검증 시도
user_data = {'name': 'John Doe', 'age': 22, 'email': 'john.doe@example.com'}
user = User(**user_data)
print(user)

# 잘못된 데이터 검증 시도
try:
    invalid_user_data = {'name': 'Jane Doe', 'age': 15, 'email': 'jane.doe@example.com'}
    User(**invalid_user_data)
except ValidationError as e:
    print(e)
```

위 예제에서 User 클래스는 Pydantic의 BaseModel을 상속받아 생성되었으며, name, age, email 필드에 대한 타입 검증이 자동으로 이루어집니다. 또한, validator 데코레이터를 사용하여 age 필드에 대한 추가적인 사용자 정의 검증 로직을 구현했습니다.

이처럼 Pydantic을 사용하면 데이터 구조와 검증 로직을 명확하게 정의할 수 있으며, 이를 통해 데이터 처리 과정에서의 실수를 줄이고, 코드의 안정성과 유지보수성을 높일 수 있습니다.
