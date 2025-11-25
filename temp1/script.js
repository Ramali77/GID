         
          // Объект для хранения таймеров
        const cardTimers = {};

        function flipCard(card2) {
            // Если карточка уже перевернута, сбрасываем таймер
            if (card2.classList.contains('flipped')) {
                resetCardTimer(card2);
                resetCard(card2);
                return;
            }

            // Переворачиваем карточку
            card2.classList.add('flipped');
            
            // Запускаем таймер автоматического возврата
            startAutoResetTimer(card2);
        }

        function startAutoResetTimer(card2) {
            const cardId = getCardId(card2);
            let timeLeft = 4;
            
            // Обновляем таймер на карточке
            updateTimerDisplay(card2, timeLeft);
            
            // Запускаем обратный отсчет
            cardTimers[cardId] = setInterval(() => {
                timeLeft--;
                updateTimerDisplay(card2, timeLeft);
                
                if (timeLeft <= 0) {
                    resetCard(card2);
                }
            }, 1000);
        }

        function resetCardTimer(card2) {
            const cardId = getCardId(card2);
            
            // Очищаем существующий таймер
            if (cardTimers[cardId]) {
                clearInterval(cardTimers[cardId]);
                delete cardTimers[cardId];
            }
            
            // Перезапускаем таймер
            startAutoResetTimer(card2);
        }

        function resetCard(card2) {
            const cardId = getCardId(card2);
            
            // Очищаем таймер
            if (cardTimers[cardId]) {
                clearInterval(cardTimers[cardId]);
                delete cardTimers[cardId];
            }
            
            // Возвращаем карточку в исходное положение
            card2.classList.remove('flipped');
        }

        function updateTimerDisplay(card2, seconds) {
            const timer = card2.querySelector('.auto-reset-timer');
            if (timer) {
                timer.textContent = `${seconds}с`;        
            }
        }

        function getCardId(card2) {
            // Создаем уникальный ID для карточки на основе её позиции
            const cards2 = document.querySelectorAll('.card2');
            return Array.from(cards2).indexOf(card2);
        }

        // Дополнительная функция для сброса всех карточек
        function resetAllCards() {
            const cards = document.querySelectorAll('.card2');
            cards.forEach(card2 => {
                resetCard(card2);
            });
        }

        // Сброс всех карточек при клике вне карточек
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.card2')) {
                resetAllCards();
            }
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.card2')) {
                resetAllCards();
            }
        });